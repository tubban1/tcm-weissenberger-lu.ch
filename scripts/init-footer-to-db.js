#!/usr/bin/env node

/**
 * 初始化 Footer 内容到数据库
 * 
 * 用法：node scripts/init-footer-to-db.js
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

const footerDefaults = {
  de: {
    companyName: 'TCM Weissenberger',
    description: 'Ganzheitliche Medizin mit wissenschaftlicher Basis und moderner Transparenz.',
    links: [
      { label: 'Über uns', href: '/about' },
      { label: 'Leistungen', href: '/services' },
      { label: 'Termin', href: '/appointment' },
      { label: 'Kontakt', href: '/contact' },
    ],
    contact: {
      title: 'Kontakt',
      address: '',
      phone: '',
      email: '',
    },
    copyright: {
      text: '© 2025 Powered by',
      linkText: 'Tubban.com',
      linkUrl: 'https://tubban.com',
      suffix: 'Agentic AI Services.',
    },
  },
  en: {
    companyName: 'TCM Weissenberger',
    description: 'Holistic medicine with scientific foundation and modern transparency.',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Appointment', href: '/appointment' },
      { label: 'Contact', href: '/contact' },
    ],
    contact: {
      title: 'Contact',
      address: '',
      phone: '',
      email: '',
    },
    copyright: {
      text: '© 2025 Powered by',
      linkText: 'Tubban.com',
      linkUrl: 'https://tubban.com',
      suffix: 'Agentic AI Services.',
    },
  },
  'zh-CN': {
    companyName: 'TCM Weissenberger',
    description: '基于科学的整体医学与现代化透明度。',
    links: [
      { label: '关于我们', href: '/about' },
      { label: '服务', href: '/services' },
      { label: '预约', href: '/appointment' },
      { label: '联系我们', href: '/contact' },
    ],
    contact: {
      title: '联系方式',
      address: '',
      phone: '',
      email: '',
    },
    copyright: {
      text: '© 2025 由',
      linkText: 'Tubban.com',
      linkUrl: 'https://tubban.com',
      suffix: 'Agentic AI Services 提供支持。',
    },
  },
}

async function initFooter() {
  let connection
  try {
    console.log('🔌 连接数据库...')
    connection = await mysql.createConnection(DB_CONFIG)
    console.log('✅ 数据库连接成功\n')

    const locales = ['de', 'en', 'zh-CN']
    let success = 0

    for (const locale of locales) {
      const content = { ...footerDefaults[locale], locale }

      // 插入或更新数据库
      await connection.execute(
        `INSERT INTO tcm_lu_page_content (page_key, locale, content)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE
           content = VALUES(content),
           updated_at = CURRENT_TIMESTAMP`,
        ['footer', locale, JSON.stringify(content)]
      )

      console.log(`✅ Footer (${locale}) → 数据库`)
      success++
    }

    console.log(`\n📊 初始化完成：${success} 条记录`)

  } catch (error) {
    console.error('❌ 初始化失败:', error.message)
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

initFooter()
