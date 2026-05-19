<!-- 菜单展开收起按钮 -->
<template>
  <el-button
    class="btn-menu-visible"
    :icon="MenuStoreId.isHideFullNavMenu ? Expand : Fold"
    @click="toggleFullMenu"
    link
  ></el-button>
</template>

<script setup lang="ts">
import { Expand, Fold } from '@element-plus/icons-vue'
import { menuStore } from '@/stores/menuStore'
// 菜单状态管理
const MenuStoreId = menuStore()
// 展开收起导航
const toggleFullMenu = () => {
  if (MenuStoreId.isHideFullNavMenu === true) {
    MenuStoreId.updateIsShowFullNavMenu(false)
  } else {
    MenuStoreId.updateIsShowFullNavMenu(true)
  }
}
</script>
<style lang="scss" scoped>
.btn-menu-visible {
  color: #303133;
  font-size: 24px;
  vertical-align: middle;
  &:hover,
  &:active,
  &:focus {
    color: #303133;
  }
}
</style>
