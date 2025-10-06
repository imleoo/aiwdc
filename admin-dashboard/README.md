# AiWDC Admin Dashboard

基于 React + Semi UI 构建的 AiWDC.com 后台管理系统，用于管理 AI 内容自动化平台。

## 🚀 功能特性

### 🎯 核心功能
- **用户认证**: 登录、注册、权限管理
- **文章管理**: 创建、编辑、发布、分类管理
- **发布管理**: 定时发布、多平台发布状态跟踪
- **社交媒体集成**: Twitter、Facebook、LinkedIn、一键发布
- **数据统计**: 用户增长、文章表现、流量分析
- **系统设置**: 平台配置、API管理、邮件设置

### 🛠️ 技术特性
- **现代化技术栈**: React 18 + TypeScript + Vite
- **企业级UI组件**: Semi UI (字节跳动)
- **状态管理**: Zustand + React Query
- **路由管理**: React Router v6
- **响应式设计**: 支持桌面端和移动端
- **类型安全**: 完整的 TypeScript 类型定义

## 📦 安装和运行

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖
```bash
npm install
```

### 配置环境变量
```bash
cp .env.example .env
```

编辑 `.env` 文件，配置以下环境变量：
```env
# API Configuration
VITE_API_URL=http://localhost:3001/api

# Social Media OAuth
VITE_TWITTER_CLIENT_ID=your_twitter_client_id
VITE_FACEBOOK_APP_ID=your_facebook_app_id
VITE_LINKEDIN_CLIENT_ID=your_linkedin_client_id
VITE_MEDIUM_CLIENT_ID=your_medium_client_id

# Analytics
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

### 代码检查
```bash
npm run lint
```

### 类型检查
```bash
npm run type-check
```

## 📁 项目结构

```
src/
├── components/          # 可复用组件
│   └── Layout.tsx      # 主布局组件
├── pages/              # 页面组件
│   ├── Dashboard.tsx   # 仪表板
│   ├── Articles.tsx    # 文章管理
│   ├── Publishing.tsx  # 发布管理
│   ├── SocialMedia.tsx # 社交媒体
│   ├── Analytics.tsx   # 数据统计
│   ├── Settings.tsx    # 系统设置
│   └── Login.tsx       # 登录页面
├── store/              # 状态管理
│   └── authStore.ts    # 用户认证状态
├── services/           # API 服务
│   └── api.ts         # HTTP 客户端
├── types/              # TypeScript 类型定义
│   └── index.ts       # 主要类型
├── hooks/              # 自定义 Hooks
├── utils/              # 工具函数
└── assets/             # 静态资源
```

## 🔧 开发指南

### 添加新页面
1. 在 `src/pages/` 目录下创建页面组件
2. 在 `src/App.tsx` 中添加路由
3. 在 `src/components/Layout.tsx` 中添加导航项

### 添加新 API
1. 在 `src/types/` 中定义数据类型
2. 在 `src/services/api.ts` 中添加 API 方法
3. 使用 React Query 进行数据获取和缓存

### 状态管理
- 使用 Zustand 管理全局状态（如用户认证）
- 使用 React Query 管理服务器状态
- 使用本地组件状态管理 UI 状态

### 样式规范
- 使用 Semi UI 组件库
- 遵循 Semi Design 设计规范
- 响应式设计，支持移动端适配

## 🔐 权限管理

系统支持三种用户角色：
- **Admin**: 管理员，拥有所有权限
- **Editor**: 编辑者，可管理文章和发布
- **Viewer**: 查看者，只能查看数据统计

## 📊 API 集成

### AI 模型 API
- OpenAI GPT-4
- Anthropic Claude
- Alibaba Qwen

### 社交媒体 API
- Twitter API v2
- Facebook Graph API
- LinkedIn API
- Medium API

### 分析服务
- Google Analytics 4
- 自定义统计 API

## 🚀 部署

### 构建生产版本
```bash
npm run build
```

### 部署到静态托管
构建完成后，`dist` 目录可以部署到任何静态托管服务：
- Vercel
- Netlify
- GitHub Pages
- 阿里云 OSS

### 环境变量配置
生产环境需要配置以下环境变量：
- `VITE_API_URL`: 后端 API 地址
- `VITE_ENV`: 环境标识
- 社交媒体 API 密钥
- Google Analytics ID

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 代码规范
- 使用 ESLint 进行代码检查
- 使用 Prettier 进行代码格式化
- 遵循 TypeScript 最佳实践
- 编写有意义的提交信息

## 📝 更新日志

### v1.0.0 (2024-01-20)
- ✨ 初始版本发布
- 🎨 完整的后台管理功能
- 🔐 用户认证和权限管理
- 📝 文章管理系统
- 📤 多平台发布功能
- 📊 数据统计和分析
- 🔗 社交媒体集成

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Semi Design](https://semi.design/) - 企业级 UI 组件库
- [React](https://reactjs.org/) - 用户界面库
- [Vite](https://vitejs.dev/) - 现代化构建工具
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集

## 📞 联系我们

- 📧 **邮箱**: support@aiwdc.com
- 🌐 **官网**: https://aiwdc.com
- 📚 **文档**: https://docs.aiwdc.com

---

**Built with ❤️ by AiWDC Team**
