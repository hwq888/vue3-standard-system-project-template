<template>
  <el-breadcrumb class="bread-crumb" separator="/">
    <!-- 首页 -->
    <el-breadcrumb-item :to="{ path: '/home' }" v-if="state.currentPath !== '/home'">首页</el-breadcrumb-item>
    <!-- 动态生成多级面包屑 -->
    <el-breadcrumb-item
      v-for="(record, index) in state.routeMatched"
      :key="index"
    >
      {{ record.tabTitle || record.meta.title || record.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { reactive, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
// const router = useRouter()

const state = reactive({
  currentPath: '', // 当前路由
  routeMatched: [] as any // 匹配到的路由记录
})
const updateBreadcrumb = () => {
  // 过滤掉首页路由记录，因为首页已经单独显示
  state.currentPath = route.matched[route.matched.length - 1].path || '/home';
  state.routeMatched = [];
  state.routeMatched.push(...route.matched.filter(record => record.path!== '/home'));
  if (route.query && route.query.tabTitle) {
    state.routeMatched[state.routeMatched.length -1].tabTitle = route.query.tabTitle
  }
}
// 监听路由变化
watch(() => route.fullPath, () => {
  updateBreadcrumb();
}, { immediate: true });

onMounted(() => {
  // updateBreadcrumb();
})

</script>
<style lang="scss" scoped>
.bread-crumb {
  display: inline-block;
  vertical-align: middle;
  margin-left: 15px;
  :deep(.el-breadcrumb__separator) {
    margin: 0 5px;
  }
  :deep(.el-breadcrumb__item + .el-breadcrumb__item) {
    .el-breadcrumb__inner {
      color: #97a8be;
    }
  }
}
</style>
