// 支持的语言列表
export const locales = ['de', 'en', 'zh-CN'] as const;
export type Locale = (typeof locales)[number];

// 默认语言：德语
export const defaultLocale: Locale = 'de';

