#!/usr/bin/env node

/**
 * 迁移脚本：将 content/ 目录下的 JSON 文件导入到数据库
 * 
 * 用法：node scripts/migrate-content-to-db.js
 */

const fs = require('fs/promises')
const path = require('path')
const mysql = require('mysql2/promise')
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') })

const DB_CONFIG = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}

const CONTENT_DIR = path.resolve(__dirname, '../content')

async function migrate() {
  let connection
  try {
    console.log('🔌 连接数据库...')
    connection = await mysql.createConnection(DB_CONFIG)
    console.log('✅ 数据库连接成功\n')

    // 读取所有语言目录
    const locales = ['de', 'en', 'zh-CN']
    const pages = ['home', 'about', 'services', 'symptoms', 'appointment', 'contact']

    let total = 0
    let success = 0
    let skipped = 0

    for (const locale of locales) {
      const localeDir = path.join(CONTENT_DIR, locale)
      
      try {
        await fs.access(localeDir)
      } catch {
        console.log(`⚠️  跳过 ${locale}：目录不存在`)
        continue
      }

      for (const page of pages) {
        const filePath = path.join(localeDir, `${page}.json`)
        total++

        try {
          const content = await fs.readFile(filePath, 'utf-8')
          const data = JSON.parse(content)

          // 插入或更新数据库
          await connection.execute(
            `INSERT INTO tcm_lu_page_content (page_key, locale, content)
             VALUES (?, ?, ?)
             ON DUPLICATE KEY UPDATE
               content = VALUES(content),
               updated_at = CURRENT_TIMESTAMP`,
            [page, locale, JSON.stringify(data)]
          )

          console.log(`✅ ${locale}/${page}.json → 数据库`)
          success++
        } catch (error) {
          if (error.code === 'ENOENT') {
            console.log(`⏭️  ${locale}/${page}.json → 文件不存在，跳过`)
            skipped++
          } else {
            console.error(`❌ ${locale}/${page}.json → 错误:`, error.message)
          }
        }
      }
    }

    console.log(`\n📊 迁移完成：`)
    console.log(`   - 总计: ${total}`)
    console.log(`   - 成功: ${success}`)
    console.log(`   - 跳过: ${skipped}`)
    console.log(`   - 失败: ${total - success - skipped}`)

  } catch (error) {
    console.error('❌ 迁移失败:', error.message)
    process.exit(1)
  } finally {
    if (connection) {
      await connection.end()
      console.log('\n🔌 数据库连接已关闭')
    }
  }
}

migrate()
