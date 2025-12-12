# 数据库配置说明

## 1. 创建数据库表

执行 SQL 脚本创建表：

```bash
mysql -h mysql2.sqlpub.com -P 3307 -u root_2 -p wish_2 < db/schema.sql
```

或者直接在 MySQL 客户端中执行 `db/schema.sql` 文件内容。

## 2. 配置环境变量

在 `.env.local`（本地）和 Vercel 环境变量中配置：

```bash
DB_HOST=mysql2.sqlpub.com
DB_PORT=3307
DB_NAME=wish_2
DB_USER=root_2
DB_PASSWORD=CmC1dAVTwocDifNR
```

## 3. 迁移现有内容到数据库

运行迁移脚本，将 `content/` 目录下的 JSON 文件导入数据库：

```bash
npm install mysql2  # 如果还没安装
node scripts/migrate-content-to-db.js
```

## 4. 验证

1. 访问 `/admin` 页面，登录后查看是否能读取内容
2. 修改内容后保存，检查是否成功写入数据库
3. 访问前端页面，检查是否从数据库读取内容

## 表结构

### `tcm_lu_page_content` - 页面内容表
- `id` - 主键
- `page_key` - 页面标识（home, about, services, symptoms, appointment, contact）
- `locale` - 语言代码（de, en, zh-CN）
- `content` - JSON 格式的页面内容
- `created_at` - 创建时间
- `updated_at` - 更新时间

### `tcm_lu_content_history` - 内容历史表（可选）
记录修改历史，便于回滚。

## 工作流程

1. **前端页面读取**：从数据库 `tcm_lu_page_content` 读取，如果不存在则使用默认模板
2. **后台编辑**：通过 `/admin` 编辑内容，保存到数据库
3. **数据持久化**：所有修改存储在数据库，无需重新部署

## 注意事项

- 数据库连接使用连接池，适合 Vercel 无服务器环境
- 如果数据库连接失败，会回退到默认内容（保证页面可用）
- 所有写入操作需要 `ADMIN_TOKEN` 或 `ADMIN_PW` 认证
