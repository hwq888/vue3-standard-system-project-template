// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import utils from '@/assets/js/utils'

export const menuStore = defineStore('menuId', {
  state: () => ({
    isHideFullNavMenu: false, // 菜单状态栏-收-缩
    columnMenuList: [] // 分栏布局-左端-菜单列表
  }),
  // Getter 完全等同于 Store 状态的 计算值
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  // Actions 相当于组件中的 methods, 与 getters 一样，操作可以通过 this 访问
  actions: {
    initNavMenu() {
      const isHideFullNavMenu = utils.getLocalStorage('isHideFullNavMenu')
      if (typeof isHideFullNavMenu === 'boolean') {
        this.isHideFullNavMenu = isHideFullNavMenu
      }
    },
    updateIsShowFullNavMenu(data: boolean) {
      utils.setLocalStorage('isHideFullNavMenu', data)
      this.isHideFullNavMenu = data
    },
    updateColumnMenuList(data: any) {
      this.columnMenuList = data
    }
  }
})
