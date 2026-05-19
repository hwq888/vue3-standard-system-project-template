<template>
  <div class="layout-box">
    <div v-if="state.showRouterPages">
      <!-- 纵向布局 -->
      <VerticalLayout v-if="themeStoreId.layout === 'vertical'"></VerticalLayout>
      <!-- 横向布局 -->
      <HorizontalLayout v-if="themeStoreId.layout === 'horizontal'"></HorizontalLayout>
      <!-- 分栏布局 -->
      <ColumnLayout v-if="themeStoreId.layout === 'column'"></ColumnLayout>
    </div>
    <!-- 内容块增加回到顶部按钮 -->
    <el-backtop :right="40" :bottom="30" target=".layout-box" />
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { sysDomainCode } from '@/globalSettings'
import { useRoute, useRouter } from 'vue-router'
import utils from '@/assets/js/utils'
import User from '@/api/User'
import ColumnLayout from './components/ColumnLayout.vue'
import HorizontalLayout from './components/HorizontalLayout.vue'
import VerticalLayout from './components/VerticalLayout.vue'
import { themeStore } from '@/stores/theme'

// 主题状态管理
const themeStoreId = themeStore()
// 路由
const route = useRoute()

// 状态管理
const state = reactive({
  showRouterPages: false
})

// URL携带UserLoginToken-直接登录
const initLogin = async () => {
  const token = route.query.UserLoginToken as string
  if (token) {
    utils.setCookie('UserLoginToken', token, '720') // 设置登录token过期时间一个月，相当于交给后端去判断token是否过期
    const params = {
      token: token
    }
    await User.currentUser(params).then((data) => {
      const { code, result, msg } = data
      if (code === 0) {
        User.saveInfo(JSON.stringify(result.user)) // 保存用户信息
      } else {
        ElMessage({ message: msg, type: 'error' })
      }
    })
  } else {
    // cookie中是否存储用户token
    const token = utils.getCookie('UserLoginToken')
    if (!token) {
      useRouter().replace('/login')
    }
  }
}
// 获取菜单权限
const getMenu = async () => {
  const params = { domainCode: sysDomainCode }
  await User.getUserMenuList(params)
    .then((data) => {
      const { code, result, msg } = data
      if (code === 0) {
        utils.setLocalStorage('UserPowerTreeData', result) // 存储当前登录用户的权限到localhost
        state.showRouterPages = true // 显示页面
      } else {
        ElMessage({ message: msg, type: 'error' })
      }
    })
    .catch((err) => {
      console.error(err)
    })
}

// 获取用户权限菜单
onMounted(async () => {
  await initLogin()
  await getMenu()
})
</script>

<style lang="scss" scoped>
.layout-box {
  height: 100vh;
  overflow-y: auto;
}
</style>
