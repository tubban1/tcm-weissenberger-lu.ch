#!/usr/bin/env node

/**
 * 初始化数据库内容：将默认内容写入数据库（如果表为空）
 * 
 * 用法：node scripts/init-db-content.js
 */

const mysql = require('mysql2/promise')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') })

const DB_CONFIG = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}

// 导入默认内容生成函数
async function getDefaultContent(page, locale) {
  // 简化版：这里可以从 defaults.ts 提取，但为了简化，直接在这里定义基础结构
  // 实际使用中，运行 migrate-content-to-db.js 更合适
  return {}
}

async function init() {
  let connection
  try {
    console.log('🔌 连接数据库...')
    connection = await mysql.createConnection(DB_CONFIG)
    console.log('✅ 数据库连接成功\n')

    // 检查是否已有数据
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM tcm_lu_page_content')
    const count = (rows as any[])[0]?.count || 0

    if (count > 0) {
      console.log(`ℹ️  数据库已有 ${count} 条记录，跳过初始化`)
      console.log('💡 如需重新导入，请先清空表或使用 migrate-content-to-db.js')
      return
    }

    console.log('📝 数据库为空，建议运行迁移脚本导入现有内容：')
    console.log('   node scripts/migrate-content-to-db.js\n')

  } catch (error: any) {
    if (error.code === 'ER_NO_SUCH_TABLE') {
      console.error('❌ 表不存在，请先执行 SQL 脚本创建表：')
      console.error('   mysql -h mysql2.sqlpub.com -P 3307 -u root_2 -p wish_2 < db/schema.sql')
    } else {
      console.error('❌ 初始化失败:', error.message)
    }
    process.exit(1)
  } finally {
    if (connection) {
      await connection.end()
      console.log('🔌 数据库连接已关闭')
    }
  }
}

init()
