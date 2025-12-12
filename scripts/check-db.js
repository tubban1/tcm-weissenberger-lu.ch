#!/usr/bin/env node

/**
 * 检查数据库内容
 * 
 * 用法：node scripts/check-db.js
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

async function check() {
  let connection
  try {
    console.log('🔌 连接数据库...')
    connection = await mysql.createConnection(DB_CONFIG)
    console.log('✅ 数据库连接成功\n')

    // 检查表是否存在
    const [tables] = await connection.execute(
      `SELECT TABLE_NAME 
       FROM information_schema.TABLES 
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME LIKE 'tcm_lu_%'`,
      [DB_CONFIG.database]
    )
    
    console.log('📋 找到的表：')
    if (Array.isArray(tables) && tables.length > 0) {
      tables.forEach((t) => console.log(`   - ${t.TABLE_NAME}`))
    } else {
      console.log('   ⚠️  没有找到 tcm_lu_ 前缀的表')
    }

    // 检查数据条数
    const [rows] = await connection.execute(
      'SELECT COUNT(*) as count FROM tcm_lu_page_content'
    )
    const count = rows[0]?.count || 0
    console.log(`\n📊 tcm_lu_page_content 表中有 ${count} 条记录\n`)

    if (count > 0) {
      // 显示前 5 条记录
      const [records] = await connection.execute(
        'SELECT page_key, locale, created_at, updated_at FROM tcm_lu_page_content ORDER BY created_at DESC LIMIT 5'
      )
      console.log('📝 最近 5 条记录：')
      records.forEach((r) => {
        console.log(`   - ${r.page_key} (${r.locale}) - 创建: ${r.created_at}, 更新: ${r.updated_at}`)
      })

      // 按语言统计
      const [stats] = await connection.execute(
        'SELECT locale, COUNT(*) as count FROM tcm_lu_page_content GROUP BY locale'
      )
      console.log('\n📈 按语言统计：')
      stats.forEach((s) => {
        console.log(`   - ${s.locale}: ${s.count} 条`)
      })
    }

  } catch (error) {
    if (error.code === 'ER_NO_SUCH_TABLE') {
      console.error('❌ 表不存在，请先执行 SQL 脚本创建表：')
      console.error('   mysql -h mysql2.sqlpub.com -P 3307 -u root_2 -p wish_2 < db/schema.sql')
    } else {
      console.error('❌ 检查失败:', error.message)
      console.error('   错误详情:', error)
    }
    process.exit(1)
  } finally {
    if (connection) {
      await connection.end()
      console.log('\n🔌 数据库连接已关闭')
    }
  }
}

check()
