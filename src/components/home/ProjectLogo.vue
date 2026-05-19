<!-- 项目-名称/logo -->
<template>
  <div class="logo_box flex_row flex_center" v-on:click="linkHome()">
    <img class="logo" src="@/assets/imgs/logo.png" alt="logo" />
    <p class="project_name" v-if="props.mode === 'column' ? true : !state.isCollapse">{{sysName}}</p>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed} from 'vue'
import { sysName } from '@/globalSettings'
import { menuStore } from '@/stores/menuStore'
import { useRouter } from 'vue-router'
const router = useRouter()
// 参数管理
const props = defineProps(['mode'])
// 菜单状态管理
const MenuStoreId = menuStore()
// 状态管理工具
const state = reactive({
  isCollapse: computed(() => {
    return MenuStoreId.isHideFullNavMenu
  })
})
// 跳转到首页
const linkHome = () => {
  router.push('/home')
}

</script>
<style lang="scss" scoped>
.logo_box {
  min-width: 60px;
  max-width: 200px;
  padding: 2px 2px 2px 5px;
  height: 50px;
  cursor: pointer;
  .logo {
    width: 32px;
  }
  .project_name {
    font-size: 13px;
    @include font_color('fontColor');
    // margin-left: 8px;
    padding: 0 5px;
    min-width: 126px;
    font-family: Arial, sans-serif; /* 使用 Arial 字体 */
    font-weight: bold; /* 字体加粗 */
    text-transform: uppercase; /* 转换为大写字母 */
    letter-spacing: 2px; /* 字间距 */
    text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3); /* 文字阴影 */
  }
}
</style>
