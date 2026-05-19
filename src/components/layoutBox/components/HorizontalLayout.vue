<!-- 横向布局 -->
<template>
  <div>
    <el-container>
      <el-header class="header-box">
        <section class="panel-top">
          <el-row>
            <el-col :span="18" class="flex_row">
              <ProjectLogo mode="horizontal"></ProjectLogo>
              <NavMenu mode="horizontal" class="nav_menu_box"></NavMenu>
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
        <section class="panel-tags">
          <TagSelect></TagSelect>
        </section>
      </el-header>
      <el-main class="main-box">
        <section class="router-content-box">
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
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { reactive, provide, computed, nextTick } from 'vue'
import UserName from '@/components/home/UserName.vue'
import FullScreen from '@/components/home/FullScreen.vue'
import ProjectLogo from '@/components/home/ProjectLogo.vue'
import SetupDrawer from '@/components/home/SetupDrawer.vue'
import MessagePrompt from '@/components/home/MessagePrompt.vue'
import LangSelect from '@/components/home/LangSelect.vue'
import NavMenu from '@/components/home/NavMenu.vue'
import TagSelect from '@/components/home/TagSelect.vue'
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
    padding: 2px 1%;
    height: 56px;
    color: #c0ccda;
    margin: 0 auto;
  }
  .top-right {
    min-width: 320px;
    height: 60px;
    @include font_color('fontColor');
  }
  .nav_menu_box {
    margin: -2px 0 0 30px;
  }
  .panel-tags {
    background: #fff;
    // box-shadow: 0 2px 2px #ddd;
    border-bottom: 1px solid #f0f0f0;
    padding: 0 1% 2px 1%;
    text-align: left;
  }
}

.main-box {
  padding: 115px 1% 0 1%;
  margin-bottom: 15px;
  display: inline-block;
}
.router-content-box {
  position: relative;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 2px #ddd;
}
</style>
