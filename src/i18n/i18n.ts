import type { App } from 'vue'
import { createI18n } from 'vue-i18n' //引入vue-i18n组件
import { globalConfig } from '@/globalSettings'
import { messages } from './langs'
const {
  setting: { defaultLang }
} = globalConfig

//注册i8n实例并引入语言文件
const localeData = {
  legacy: false, // 使用CompotitionAPI必须添加这条.
  locale: localStorage.lang || defaultLang,
  messages, // 一个语言包对象，简单
  globalInjection: true
}
export const i18n = createI18n(localeData)
// setup i18n instance with glob
export const setupI18n = {
  install(app: App) {
    const i18n = createI18n(localeData)
    app.use(i18n)
  }
}
