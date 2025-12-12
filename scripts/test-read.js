#!/usr/bin/env node

/**
 * 测试从数据库读取内容（模拟前端读取）
 * 
 * 用法：node scripts/test-read.js
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

async function testRead() {
  let connection
  try {
    console.log('🔌 连接数据库...')
    connection = await mysql.createConnection(DB_CONFIG)
    console.log('✅ 数据库连接成功\n')

    const testPages = [
      { page: 'home', locale: 'de' },
      { page: 'home', locale: 'en' },
      { page: 'about', locale: 'de' },
      { page: 'contact', locale: 'zh-CN' },
    ]

    for (const { page, locale } of testPages) {
      console.log(`\n📖 测试读取: ${page} (${locale})`)
      
      const [results] = await connection.execute(
        'SELECT content FROM tcm_lu_page_content WHERE page_key = ? AND locale = ?',
        [page, locale]
      )

      if (results && results.length > 0) {
        const content = results[0].content
        const data = typeof content === 'string' ? JSON.parse(content) : content
        
        console.log(`   ✅ 成功读取`)
        console.log(`   📝 标题: ${data.hero?.title || data.title || 'N/A'}`)
        if (data.hero?.subtitle) {
          console.log(`   📝 副标题: ${data.hero.subtitle.substring(0, 50)}...`)
        }
      } else {
        console.log(`   ⚠️  未找到数据（将使用默认模板）`)
      }
    }

    console.log('\n✅ 数据库读取测试完成')
    console.log('\n💡 提示：')
    console.log('   - 前端页面已配置从数据库读取')
    console.log('   - 如果数据库没有数据，会使用默认模板')
    console.log('   - 访问 http://localhost:3000 会自动跳转到 /de')
    console.log('   - 访问 http://localhost:3000/admin 可以编辑内容')

  } catch (error) {
    console.error('❌ 测试失败:', error.message)
    if (error.code === 'ER_NO_SUCH_TABLE') {
      console.error('\n请先执行 SQL 脚本创建表')
    }
    process.exit(1)
  } finally {
    if (connection) {
      await connection.end()
      console.log('\n🔌 数据库连接已关闭')
    }
  }
}

testRead()
