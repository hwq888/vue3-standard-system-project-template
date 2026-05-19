<!-- 分栏布局 -->
<template>
  <div>
    <el-container>
      <el-header class="header-box">
        <section class="panel-top">
          <el-row>
            <el-col :span="18" class="flex_row">
              <ProjectLogo mode="column"></ProjectLogo>
              <NavMenuOneLevel mode="column" class="nav_menu_box"></NavMenuOneLevel>
            </el-col>
            <el-col :span="6">
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
                <lang-select v-if="showLang"></lang-select>
              </div>
            </el-col>
          </el-row>
        </section>
      </el-header>
      <div class="main-content-box">
        <el-aside class="nav-left" :class="{ 'hide-nav-left': MenuStoreId.isHideFullNavMenu }">
          <section>
            <NavMenu mode="column"></NavMenu>
          </section>
        </el-aside>
        <div>
          <section
            class="router-content-box"
            :class="[
              MenuStoreId.isHideFullNavMenu
                ? 'router-content-box-width-hide'
                : 'router-content-box-width-show'
            ]"
          >
            <el-col :span="24">
              <div class="bread-box">
                <!-- 菜单展开收起按钮 -->
                <shrink-button></shrink-button>
                <!-- 面包屑 -->
                <right-bread></right-bread>
              </div>
              <section class="panel-tags">
                <!-- 菜单标签 -->
                <TagSelect></TagSelect>
              </section>
              <router-view v-slot="{ Component }" v-if="state.isRouterViewAlive" class="router-view-box">
                <keep-alive :include="TagsStoreId.keepAliveInclude">
                  <component :is="Component" :key="router.currentRoute.value.fullPath" />
                </keep-alive>
              </router-view>
            </el-col>
          </section>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { reactive, provide, computed, nextTick } from 'vue'
import UserName from '@/components/home/UserName.vue'
import ProjectLogo from '@/components/home/ProjectLogo.vue'
import FullScreen from '@/components/home/FullScreen.vue'
import SetupDrawer from '@/components/home/SetupDrawer.vue'
import MessagePrompt from '@/components/home/MessagePrompt.vue'
import LangSelect from '@/components/home/LangSelect.vue'
import NavMenuOneLevel from '@/components/home/NavMenuOneLevel.vue'
import NavMenu from '@/components/home/NavMenu.vue'
import TagSelect from '@/components/home/TagSelect.vue'
import ShrinkButton from '@/components/home/ShrinkButton.vue'
import RightBread from '@/components/home/RightBread.vue'
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
  isRouterViewAlive: true,
  isCollapse: computed(() => {
    return MenuStoreId.isHideFullNavMenu
  })
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
.header-box {
  padding: 0;
  @include menu_background_color('menuBackgroundColor');
  @include menu_border_color('menuBorderColor');
  border-bottom: 1px solid;
  text-align: center;
  // height: 101px;
  position: fixed;
  z-index: 3000;
  left: 0;
  top: 0;
  width: 100%;
  .panel-top {
    padding: 2px 15px 2px 0;
    height: 58px;
    color: #c0ccda;
    margin: 0 auto;
  }
  .top-right {
    min-width: 320px;
    height: 60px;
    @include font_color('fontColor');
  }
  .nav_menu_box {
    margin: -2px 0 0 0;
  }
  .panel-tags {
    background: #fff;
    box-shadow: 0 2px 2px #ddd;
    padding: 0 5%;
    text-align: left;
  }
}
.nav-left {
  width: 200px;
  height: 100vh;
  transition: width 300ms;
  // @include menu_background_color('menuBackgroundColor');
  // @include menu_border_color('menuBorderColor');
  background-color: #F4F9FF;
  border-right: 1px solid #f0f0f0;
  position: fixed;
  left: 0;
  top: 60px;
  bottom: 0;
  &.hide-nav-left {
    width: 65px;
  }
  :deep(.el-menu) {
    background-color: #F4F9FF;
    border-right: none;
  }
  :deep(.el-sub-menu__title:hover) {
    background-color: var(--el-color-primary-light-9);
  }
  :deep(.el-menu-item:hover) {
    background-color: var(--el-color-primary-light-9);
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
  margin-bottom: 15px;
  display: inline-block;
}
.router-content-box {
  position: relative;
  // padding: 20px;
  margin: 60px 15px 15px 15px;
  // background-color: #ffffff;
  transition: all 300ms;
  .bread-box {
    background-color: #ffffff;
    padding: 12px 15px 5px 15px;
  }
  .panel-tags {
    background: #fff;
    // box-shadow: 0 2px 2px #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
    padding: 0px 15px 2px 15px;
    z-index: 3000;
  }
  .router-view-box {
    background-color: #ffffff;
    margin: 15px;
    padding: 15px;
  }
}
.router-content-box-width-hide {
  margin: 60px 0 15px calc(65px);
}
.router-content-box-width-show {
  margin: 60px 0 15px calc(200px);
}
</style>
