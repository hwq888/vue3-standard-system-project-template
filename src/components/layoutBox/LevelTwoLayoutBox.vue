<template>
  <el-config-provider :locale="langStoreId.elementLang">
    <RouterView class="router-view-box" v-if="state.isRouterAlive" />
  </el-config-provider>
</template>
<script setup lang="ts">
import { onMounted, provide, nextTick, reactive } from 'vue'
import { RouterView } from 'vue-router'
import { langStore } from '@/stores/lang'

// 国际化状态管理
const langStoreId = langStore()
// 状态管理
const state = reactive({
  isRouterAlive: true
})

// 重新加载路由
const reload = async (): Promise<void> => {
  state.isRouterAlive = false
  await nextTick()
  state.isRouterAlive = true
}
provide('reload', reload)

onMounted(() => {
  console.info('系统环境变量：', import.meta.env)
})
</script>
<style scoped lang="scss">
 .router-view-box {
    background-color: #ffffff;
    margin: 15px;
    padding: 15px;
  }
</style>
