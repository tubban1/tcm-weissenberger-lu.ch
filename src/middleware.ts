import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
  // 支持的语言列表
  locales,
  // 默认语言
  defaultLocale,
  // 语言检测策略：从 URL 路径检测
  localePrefix: 'always'
});

export const config = {
  // 匹配所有路径，除了：
  // - API 路由
  // - _next 静态文件
  // - 图片等静态资源
  // - /admin 后台（不做语言前缀重写）
  matcher: ['/((?!api|_next|_vercel|admin|.*\\..*).*)']
};

