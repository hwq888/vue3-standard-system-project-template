<!-- 放大满屏 -->
<template>
  <div class="box">
    <el-icon @click="toggleFullScreen">
      <Crop v-if="state.full" />
      <FullScreen v-else />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { FullScreen, Crop } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import screenfull from 'screenfull'
// 状态管理
const state = reactive({
  full: false
})
// 展开收起导航
const toggleFullScreen = () => {
  if (!screenfull.isEnabled) {
    ElMessage({ message: '开启全屏失败', type: 'error' })
    return false
  }
  screenfull.toggle()
  state.full = !state.full
}
</script>
<style lang="scss" scoped>
.box {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}
</style>
