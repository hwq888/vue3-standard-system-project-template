// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { RouteLocationNormalized } from 'vue-router'
// import utils from '@/assets/js/utils'
const home = [{ path: '/home', fullPath: '/home', title: '首页', name: 'home' }]
export const tagsStore = defineStore('tagsId', {
  state: () => ({
    tagsList: [...home],
    keepAliveInclude: [] as string[], // 路由缓存数组
    collapse: false
  }),
  // Getter 完全等同于 Store 状态的 计算值
  getters: {
    // getterTagsList (state) {
    //     return state.tagsList
    // },
    // getterKeepAliveInclude (state) {
    //     return state.keepAliveInclude
    // }
  },
  // Actions 相当于组件中的 methods, 与 getters 一样，操作可以通过 this 访问
  actions: {
    // 删除tag
    delTagsItem(data: { index: number }) {
      this.tagsList.splice(data.index, 1)
    },
    // 新增tag
    setTagsItem(data: { path: string; fullPath: string; title: string; name: string }) {
      this.tagsList.push(data)
    },
    // 清空tagsList
    clearTags() {
      this.keepAliveInclude = [] // 清空所有路由缓存
      this.tagsList = [...home]
    },
    // 清空其他tagsList
    closeTagsOther(data: any) {
      this.tagsList = [...home, ...data]
    },
    // 关闭当前tag-跳转到自定tag
    closeCurrentTag(data: { fromPath: string; toPath: any; $router: string[] }) {
      for (let i = 0, len = this.tagsList.length; i < len; i++) {
        const item = this.tagsList[i]
        if (item.path === data.fromPath) {
          if (data.toPath) {
            data.$router.push(data.toPath)
          } else if (i < len - 1) {
            data.$router.push(this.tagsList[i + 1].fullPath)
          } else if (i > 0) {
            data.$router.push(this.tagsList[i - 1].fullPath)
          } else {
            data.$router.push('/home')
          }
          this.tagsList.splice(i, 1)
          break
        }
      }
    },
    // 侧边栏折叠
    handleCollapse(data: boolean) {
      this.collapse = data
    },
    // 配置路由缓存
    setKeepAlive(data: { to: RouteLocationNormalized }) {
      const { name, meta } = data.to
      if (meta.keepAlive && name != null) {
        const routeName = typeof name === 'string' ? name : String(name)
        !this.keepAliveInclude.includes(routeName) && this.keepAliveInclude.push(routeName)
      }
    },
    // 清空对应路由缓存
    clearKeepAlive(data: { name: any }) {
      if (data.name) {
        const index = this.keepAliveInclude.indexOf(data.name)
        index !== -1 && this.keepAliveInclude.splice(index, 1)
      }
    },
    // 清空其他路由缓存
    clearOtherKeepAlive(_route: { meta: { keepAlive: boolean }; name: string }) {
      // 判断当前路由是否需要加入缓存
      if (_route.meta.keepAlive) {
        this.keepAliveInclude = [_route.name]
      }
    }
  }
})
