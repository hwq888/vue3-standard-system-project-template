// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { globalConfig } from '@/globalSettings'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

const {
  setting: { defaultLang }
} = globalConfig

export const langStore = defineStore('langId', {
  state: () => ({
    lang: localStorage.lang || defaultLang // 国际化配置值
  }),
  // Getter 完全等同于 Store 状态的 计算值
  getters: {
    // element-plus 语言库配置值
    elementLang(state) {
      if (state.lang === 'zh') {
        return zhCn
      } else if (state.lang === 'en') {
        return en
      } else {
        return zhCn
      }
    }
  },
  // Actions 相当于组件中的 methods, 与 getters 一样，操作可以通过 this 访问
  actions: {
    updateLang(data: string) {
      this.lang = data
    }
  }
})
