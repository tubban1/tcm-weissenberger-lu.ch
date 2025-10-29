# TCM Weissenberger - 中医诊所网站

专业的中医诊所官方网站，基于 Next.js 构建。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **字体**: Inter (Google Fonts)

## 开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

### 构建生产版本

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

## 项目结构

```
tcm-weissenberger-lu.ch/
├── src/
│   ├── app/                  # Next.js App Router 页面
│   │   ├── layout.tsx        # 根布局
│   │   ├── page.tsx          # 首页
│   │   ├── globals.css       # 全局样式
│   │   ├── about/            # 关于我们页面
│   │   ├── services/         # 服务项目页面
│   │   ├── appointment/      # 预约就诊页面
│   │   └── contact/          # 联系方式页面
│   └── components/           # 可复用组件
│       ├── Nav.tsx           # 导航组件
│       └── Footer.tsx        # 页脚组件
├── doc/                      # 文档目录
│   └── PRD.md               # 产品需求文档
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
└── README.md
```

## 页面说明

- **首页** (`/`): 展示诊所品牌、核心服务预览、快速导航
- **关于我们** (`/about`): 诊所介绍、使命、团队信息
- **服务项目** (`/services`): 详细展示所有中医服务项目
- **预约就诊** (`/appointment`): 在线预约表单
- **联系方式** (`/contact`): 联系信息和在线咨询表单

## 设计特点

- 简洁大方的界面设计
- 响应式布局，支持移动端
- 专业的中医诊所品牌形象
- 易于导航和使用

## 环境要求

- Node.js >= 18.17.0
- npm 或 yarn

## 注意事项

- 确保所有联系信息和内容准确
- 表单提交功能需后续对接后端服务
- 生产环境部署前需配置环境变量

## 文档

详细的产品需求文档请查看 [doc/PRD.md](./doc/PRD.md)

