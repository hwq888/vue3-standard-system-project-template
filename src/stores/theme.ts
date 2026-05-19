// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { globalConfig } from '@/globalSettings'

const {
  theme: { layout, themeName }
} = globalConfig

export const themeStore = defineStore('themeStoreId', {
  state: () => ({
    layout: layout as string, // 布局
    themeName: themeName as string // 主题
  }),
  // Getter 完全等同于 Store 状态的 计算值
  getters: {},
  // Actions 相当于组件中的 methods, 与 getters 一样，操作可以通过 this 访问
  actions: {
    updateLayout(data: string) {
      localStorage.setItem('layout', data)
      this.layout = data
    },
    updateThemeName(data: string) {
      this.themeName = data
      // localStorage.setItem('themeName', data)
      // this.themeName = data
      //修改html的主题
      // window.document.documentElement.setAttribute('data-theme',`${data}`)
      // document.getElementsByTagName('body')[0].className = `system-theme-${data}`
    }
  }
})
