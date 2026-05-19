<!-- 纵向布局 -->
<template>
  <div>
    <el-container>
      <el-aside class="nav-left" :class="{ 'hide-nav-left': MenuStoreId.isHideFullNavMenu }">
        <section>
          <ProjectLogo mode="vertical"></ProjectLogo>
          <NavMenu mode="vertical"></NavMenu>
        </section>
      </el-aside>
      <el-main class="main-box">
        <div
          class="fixed-header"
          :class="[
            MenuStoreId.isHideFullNavMenu ? 'fixed-header-width-hide' : 'fixed-header-width-show'
          ]"
        >
          <div class="nav-top flex_row flex_column_center">
            <div class="top-left">
              <!-- 菜单展开收起按钮 -->
              <shrink-button></shrink-button>
              <!-- 面包屑 -->
              <right-bread></right-bread>
            </div>
            <div class="top-right flex_row_right flex_column_center">
              <!-- 用户名称 -->
              <user-name></user-name>
              <!-- 满屏操作 -->
              <full-screen v-if="showFullScreen"></full-screen>
              <!-- 主题设置 -->
              <setup-drawer v-if="showSetUp"></setup-drawer>
              <!-- 消息提示 -->
              <message-prompt v-if="showMessages"></message-prompt>
              <!-- 语言切换 -->
              <lang-select textColor="#303133" v-if="showLang"></lang-select>
            </div>
          </div>
          <div class="panel-tags rel">
            <TagSelect></TagSelect>
          </div>
        </div>

        <!-- <el-scrollbar> -->
        <section
          class="router-content-box"
          :class="[
            MenuStoreId.isHideFullNavMenu
              ? 'router-content-box-width-hide'
              : 'router-content-box-width-show'
          ]"
        >
          <el-col :span="24">
            <router-view v-slot="{ Component }" v-if="state.isRouterViewAlive">
              <!-- <transition name="fade-transform" mode="out-in"> -->
              <keep-alive :include="TagsStoreId.keepAliveInclude">
                <component :is="Component" :key="router.currentRoute.value.fullPath" />
              </keep-alive>
              <!-- </transition> -->
            </router-view>
          </el-col>
        </section>
        <!-- </el-scrollbar> -->
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { reactive, provide, nextTick } from 'vue'
import NavMenu from '@/components/home/NavMenu.vue'
import TagSelect from '@/components/home/TagSelect.vue'
import RightBread from '@/components/home/RightBread.vue'
import ShrinkButton from '@/components/home/ShrinkButton.vue'
import UserName from '@/components/home/UserName.vue'
import FullScreen from '@/components/home/FullScreen.vue'
import ProjectLogo from '@/components/home/ProjectLogo.vue'
import SetupDrawer from '@/components/home/SetupDrawer.vue'
import MessagePrompt from '@/components/home/MessagePrompt.vue'
import LangSelect from '@/components/home/LangSelect.vue'
import { menuStore } from '@/stores/menuStore'
import { tagsStore } from '@/stores/tags'
import { globalConfig } from '@/globalSettings'
import { useRouter } from 'vue-router'
const router = useRouter()
// 菜单状态管理
const MenuStoreId = menuStore()
//标签状态管理
const TagsStoreId = tagsStore()
// 全局配置管理
const {
  setting: { showLang, showMessages, showSetUp, showFullScreen }
} = globalConfig
// 状态管理
const state = reactive({
  isRouterViewAlive: true
})

// 刷新二级路由页面
const reloadRouter = async (): Promise<void> => {
  state.isRouterViewAlive = false
  await nextTick()
  state.isRouterViewAlive = true
}
provide('reloadRouter', reloadRouter)
</script>

<style lang="scss" scoped>
.nav-left {
  width: 200px;
  height: 100vh;
  transition: width 300ms;
  @include menu_background_color('menuBackgroundColor');
  @include menu_border_color('menuBorderColor');
  border-right: 1px solid;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  &.hide-nav-left {
    width: 65px;
  }
  :deep(.el-menu) {
    border-right: none;
  }
  :deep(.el-scrollbar) {
    height: 100%;
  }
  :deep(.el-scrollbar__wrap) {
    height: 100%;
    overflow-x: hidden;
  }
}
.main-box {
  padding: 0;
  // height: 100vh;
  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1998;
    width: 100%;
    transition: width 300ms;
  }
  .fixed-header-width-hide {
    width: calc(100% - 65px);
  }
  .fixed-header-width-show {
    width: calc(100% - 200px);
  }
  .nav-top {
    background-color: #ffffff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    // border-bottom: 1px solid #f9f9f9;
    z-index: 1;
    height: 60px;
    padding: 0 30px 0 15px;
    // .top-left {
    //   margin-left: 15px;
    // }
    .top-right {
      flex-grow: 1;
    }
  }
  .panel-tags {
    background: #fff;
    // box-shadow: 0 2px 2px #ddd;
    border-bottom: 1px solid #f0f0f0;
    padding: 0 30px 2px 15px;
    z-index: 3000;
  }
}
.router-content-box {
  position: relative;
  padding: 20px;
  margin: 115px 15px 15px 15px;
  background-color: #ffffff;
  transition: all 300ms;
}
.router-content-box-width-hide {
  margin: 115px 15px 15px calc(65px + 15px);
}
.router-content-box-width-show {
  margin: 115px 15px 15px calc(200px + 15px);
}
</style>
