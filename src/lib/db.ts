import 'server-only'
import mysql from 'mysql2/promise'

// 在 Next.js 无服务器环境中使用 globalThis 确保单例
declare global {
  // eslint-disable-next-line no-var
  var __dbPool: mysql.Pool | undefined
  // eslint-disable-next-line no-var
  var __dbPoolInitialized: boolean | undefined
}

// 添加连接池锁，防止并发初始化
let poolInitLock: Promise<void> | null = null

async function getPool(): Promise<mysql.Pool> {
  // 统一使用 globalThis，确保在所有环境中都是单例
  // 检查是否已经初始化并且连接池仍然有效
  if (global.__dbPool && global.__dbPoolInitialized) {
    return global.__dbPool
  }

  // 如果正在初始化，等待初始化完成
  if (poolInitLock) {
    await poolInitLock
    return global.__dbPool!
  }

  // 如果旧的连接池存在但没有初始化标志，先尝试关闭它
  if (global.__dbPool && !global.__dbPoolInitialized) {
    try {
      // end() 返回 Promise，需要处理
      await global.__dbPool.end().catch(() => {
        // 忽略关闭错误
      })
    } catch (e) {
      // 忽略关闭错误
    }
    global.__dbPool = undefined
  }

  // 设置初始化锁
  poolInitLock = (async () => {
    console.log('[DB] Initializing connection pool (connectionLimit: 1)...')
    global.__dbPool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      // 每个实例只使用 1 个连接，避免超过数据库的 30 个连接限制
      connectionLimit: 1,
      // 设置队列，允许等待连接可用（最多等待 10 秒）
      queueLimit: 100,
      connectTimeout: 10000,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      // 添加连接池配置，确保连接被正确复用
      acquireTimeout: 10000, // 获取连接的超时时间
    })
    global.__dbPoolInitialized = true
    console.log('[DB] Connection pool initialized')
  })()

  // 等待初始化完成
  await poolInitLock
  poolInitLock = null // 清除锁
  
  return global.__dbPool!
}

export async function query(sql: string, params?: any[]) {
  const pool = await getPool()
  let connection: mysql.PoolConnection | null = null
  
  try {
    // 获取连接，如果连接池已满会等待（最多 10 秒）
    connection = await pool.getConnection()
    
    // 执行查询
    const [results] = await connection.execute(sql, params || [])
    return results
  } catch (error: any) {
    // 如果是连接数超限错误，等待后重试一次
    if (error?.code === 'ER_USER_LIMIT_REACHED') {
      console.error('[DB] Connection limit reached, this might be due to multiple instances or old connections')
      
      // 如果遇到连接限制错误，等待更长时间后重试
      // 但只重试一次，避免无限循环
      if (!(error as any)._retried) {
        (error as any)._retried = true
        console.log('[DB] Waiting 2s before retry...')
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // 清理当前连接
        if (connection) {
          try {
            connection.release()
          } catch (e) {
            // 忽略释放错误
          }
          connection = null
        }
        
        // 重试
        try {
          connection = await pool.getConnection()
          const [results] = await connection.execute(sql, params || [])
          console.log('[DB] Retry successful')
          return results
        } catch (retryError) {
          // 重试失败，抛出原始错误
          throw error
        }
      }
    }
    
    console.error('[DB Query Error]', {
      code: error?.code,
      message: error?.message,
      sql: sql.substring(0, 100),
    })
    throw error
  } finally {
    // 确保连接被释放回连接池
    if (connection) {
      try {
        connection.release()
      } catch (e) {
        // 忽略释放错误，可能连接已经关闭
        console.warn('[DB] Error releasing connection:', e)
      }
    }
  }
}
