# 部署指南

本文档说明如何部署 AiWDC Admin Dashboard 到不同的平台。

## 📦 构建生产版本

```bash
# 安装依赖
npm install

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

构建完成后，`dist` 目录包含所有静态文件，可以部署到任何静态托管服务。

## 🚀 部署选项

### 1. Vercel 部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel --prod
```

或在 Vercel 网站上：
1. 连接 GitHub 仓库
2. 设置构建命令：`npm run build`
3. 设置输出目录：`dist`
4. 配置环境变量

### 2. Netlify 部署

```bash
# 安装 Netlify CLI
npm i -g netlify-cli

# 部署
netlify deploy --prod --dir=dist
```

或在 Netlify 网站上：
1. 连接 GitHub 仓库
2. 设置构建命令：`npm run build`
3. 设置发布目录：`dist`

### 3. GitHub Pages 部署

```bash
# 安装 gh-pages
npm install --save-dev gh-pages

# 添加部署脚本到 package.json
"deploy": "npm run build && gh-pages -d dist"

# 部署
npm run deploy
```

### 4. 阿里云 OSS 部署

使用阿里云 CLI 或控制台上传 `dist` 目录内容到 OSS bucket。

### 5. Nginx 服务器部署

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # 缓存静态资源
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 🔧 环境变量配置

### 开发环境 (.env.development)
```env
VITE_API_URL=http://localhost:3001/api
VITE_ENV=development
VITE_TWITTER_CLIENT_ID=your_dev_twitter_client_id
VITE_FACEBOOK_APP_ID=your_dev_facebook_app_id
VITE_LINKEDIN_CLIENT_ID=your_dev_linkedin_client_id
VITE_MEDIUM_CLIENT_ID=your_dev_medium_client_id
```

### 生产环境 (.env.production)
```env
VITE_API_URL=https://api.aiwdc.com
VITE_ENV=production
VITE_TWITTER_CLIENT_ID=your_prod_twitter_client_id
VITE_FACEBOOK_APP_ID=your_prod_facebook_app_id
VITE_LINKEDIN_CLIENT_ID=your_prod_linkedin_client_id
VITE_MEDIUM_CLIENT_ID=your_prod_medium_client_id
```

## 🔐 安全配置

### 1. HTTPS 配置
确保生产环境使用 HTTPS：

```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    # SSL 配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
}
```

### 2. 内容安全策略 (CSP)
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;">
```

### 3. API 安全
- 使用 JWT Token 认证
- 实施 API 速率限制
- 验证所有输入数据
- 使用 HTTPS API 调用

## 📊 性能优化

### 1. 构建优化
```bash
# 分析构建包大小
npm run build -- --analyze

# 启用压缩
npm run build
```

### 2. CDN 配置
将静态资源部署到 CDN：
```javascript
// vite.config.ts
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? 'https://cdn.your-domain.com/' : '/',
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'js/[name].[hash].js',
        entryFileNames: 'js/[name].[hash].js'
      }
    }
  }
})
```

### 3. 缓存策略
```javascript
// service-worker.js
const CACHE_NAME = 'aiwdc-admin-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});
```

## 🔍 监控和日志

### 1. 错误监控
集成 Sentry 或类似服务：
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
});
```

### 2. 性能监控
```javascript
// Google Analytics 4
gtag('config', 'GA_MEASUREMENT_ID', {
  page_location: window.location.href,
  page_title: document.title
});
```

### 3. 用户行为追踪
```javascript
// 自定义事件追踪
gtag('event', 'login', {
  method: 'email'
});

gtag('event', 'article_published', {
  article_id: '123'
});
```

## 🚨 故障排除

### 常见问题

1. **构建失败**
   ```bash
   # 清除缓存
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **路由 404**
   - 确保服务器配置了 SPA 路由重写
   - 使用 `try_files $uri $uri/ /index.html;` (Nginx)

3. **API 连接问题**
   - 检查环境变量配置
   - 验证 API 服务器状态
   - 检查 CORS 配置

4. **样式加载问题**
   - 确保 CSS 文件路径正确
   - 检查 CSS 变量定义
   - 验证主题配置

### 调试技巧

1. **启用详细日志**
   ```bash
   npm run dev -- --debug
   ```

2. **检查网络请求**
   - 使用浏览器开发者工具
   - 检查 API 响应状态
   - 验证请求头

3. **性能分析**
   ```javascript
   // 添加性能标记
   performance.mark('start-operation');
   // ... 操作代码
   performance.mark('end-operation');
   performance.measure('operation-duration', 'start-operation', 'end-operation');
   ```

## 📞 支持

如果遇到部署问题，请：
1. 检查本文档的故障排除部分
2. 查看 GitHub Issues
3. 联系技术支持：support@aiwdc.com

---

**更新日期**: 2024-01-20
**版本**: 1.0.0