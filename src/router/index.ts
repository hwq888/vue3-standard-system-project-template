/***
 * @params
 * title： 字符串   desc：页面标题配置
 * keepAlive: 布尔值  desc：当前页面是否加入缓存  vue3的页面的文件名name就是文件名（例如：AddOrViewDataSet.vue文件  name默认是 AddOrViewDataSet）
 * keepTags: 布尔值   desc：配置成true之后，路由从当前路由跳转至当前路由 不新建tab
 * isShow: 布尔值     desc：是否显示在菜单栏
 * ***/
import { createRouter, createWebHashHistory, type RouteMeta } from 'vue-router'
// 定义路由 元信息的 类型
declare module 'vue-router' {
  interface RouteMeta {
    title: string
    keepAlive: boolean
    keepTags: boolean
  }
}

const defaultMeta: RouteMeta = {
  title: '',
  keepAlive: false,
  keepTags: false,
  isShow: true
}
const layoutBox = () => import('@/components/layoutBox/LayoutBox.vue')
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      meta: { ...defaultMeta, title: '登录' },
      component: () => import('@/pages/LoginPage.vue')
    },
    {
      path: '/',
      component: layoutBox,
      meta: { ...defaultMeta, title: '首页' },
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/pages/HomePage.vue'),
          meta: { ...defaultMeta }
        }
      ]
    },
    {
      path: '/',
      component: layoutBox,
      meta: { ...defaultMeta, title: '资金方管理' },
      children: [
        {
          path: '/FundingPartyList',
          name: 'FundingPartyList',
          component: () => import('@/pages/DemoPages/DemoList.vue'),
          meta: { ...defaultMeta, title: '资金方列表', keepTags: true }
        }
      ]
    },
    {
      path: '/nofind',
      component: () => import('@/pages/NoFind.vue')
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/nofind'
    }
  ]
})

export default router
