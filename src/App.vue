<template>
  <el-config-provider :locale="langStoreId.elementLang">
    <RouterView v-if="state.isRouterAlive" />
  </el-config-provider>
</template>
<script setup lang="ts">
import { onMounted, provide, nextTick, reactive } from 'vue'
import { RouterView } from 'vue-router'
import { langStore } from '@/stores/lang'
// Element Plus 官方提供了一个 Vue 组件 ConfigProvider 用于全局配置国际化的设置
// Element Plus已全局导入，不用再单独引入
// import { ElConfigProvider } from 'element-plus'

// 国际化状态管理
const langStoreId = langStore()
// 状态管理
const state = reactive({
  isRouterAlive: true
})

// 重新加载路由
const reload = async (): Promise<void> => {
  console.log('reload')
  state.isRouterAlive = false
  await nextTick()
  state.isRouterAlive = true
}
provide('reload', reload)

onMounted(() => {
  console.info('系统环境变量：', import.meta.env)
})
</script>
<style scoped lang="scss"></style>
