<!-- 菜单标签组件 -->
<template>
  <div class="box rel" v-if="state.showTags">
    <!--    <div>{{TagsStoreId.keepAliveInclude}}</div>-->
    <div class="tags-box">
      <div class="scroll-wrapper" ref="personWrap">
        <!-- BScroll构造函数传入的盒子元素 -->
        <ul class="scroll-content" id="scroll-content">
          <!-- 内层盒子元素，必须为inline-block -->
          <li
            class="tags-li rel"
            v-for="(item, index) in TagsStoreId.tagsList"
            :class="{ active: isActive(item.fullPath), 'tags-li-right': isNoClose(item.fullPath) }"
            :key="index"
          >
            <router-link :to="item.fullPath" class="tags-li-title" :title="item.title">{{
              item.title
            }}</router-link>
            <span class="abs tags-li-icon" @click="closeTags(index)" v-if="item.path !== '/home'">
              <el-icon :size="10">
                <Close />
              </el-icon>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="tags-close-box flex_row flex_center">
      <el-dropdown
        @command="handleTags"
        placement="bottom-end"
        @visible-change="handleVisibleChange"
      >
        <span :class="{ 'tabs-more-active': active }" class="tabs-more el-dropdown-link">
          <span class="tabs-more-icon">
            <i class="box box-t"></i>
            <i class="box box-b"></i>
          </span>
        </span>
        <!-- <el-icon size="18" color="#9a9a9a"><Menu /></el-icon> -->
        <!-- <el-button :icon="Menu"></el-button> -->
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="refresh" :icon="Refresh">刷新当前</el-dropdown-item>
            <el-dropdown-item command="close" :icon="SwitchButton">关闭当前</el-dropdown-item>
            <el-dropdown-item command="other" :icon="Delete">关闭其他</el-dropdown-item>
            <el-dropdown-item command="all" :icon="FolderDelete">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, onMounted, inject, ref, nextTick, watch } from 'vue'
import { Refresh, SwitchButton, Delete, FolderDelete, Close } from '@element-plus/icons-vue'
import BScroll from '@better-scroll/core'
import { tagsStore } from '@/stores/tags'
import { useRouter, type RouteLocationNormalized } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()
// 状态管理
const reloadRouter: any = inject('reloadRouter')
const state = reactive({
  scroll: '' as any,
  showTags: true, // 显示标签菜单栏
  previousRoute: router.currentRoute.value // 存储当前路由
})
//标签状态管理
const TagsStoreId = tagsStore()
//标签菜单图标
let active = ref(false)
const handleVisibleChange = (val: boolean) => {
  active.value = val
}

// 初始化滚动
const personWrap = ref('personWrap') // 获取滚动父级DOM元素
const scrollInit = (toRight: boolean) => {
  nextTick(() => {
    if (!state.scroll) {
      state.scroll = new BScroll(personWrap.value, {
        // probeType: 3,
        scrollX: true,
        scrollY: false,
        useTransition: false,
        click: true,
        taps: false,
        swipeTime: 1000,
        bounce: {
          bottom: false,
          left: false,
          right: false,
          top: false
        }
      })
    } else {
      // refresh better-scroll API
      // 有个时候，滚动区域的内容并不是写死的，会发生变化，
      // 当DOM结构发生改变时应重新计算 BetterScroll 以确保滚动正常工作。
      state.scroll.refresh()
      // 滚动到最右端
      if (toRight) {
        state.scroll.scrollTo(state.scroll.maxScrollX, 0)
      }
    }
  })
}

// 设置标签
const setTags = (path: string, fullPath: string, to: any) => {
  // some() 方法会依次执行数组的每个元素
  // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测
  // 如果没有满足条件的元素，则返回false
  if (path === '/home') {
    return
  }
  const isExist = TagsStoreId.tagsList.some((item) => {
    return item.fullPath === fullPath
  })
  if (!isExist) {
    // 判断当前路由切换是否不需要新建标签 比较上一个路由path是否和当前路由相同 并且 keepTags=true
    if (to && state.previousRoute && to.meta.keepTags && path === state.previousRoute.path) {
      // 找到当前标签的索引
      let index = TagsStoreId.tagsList.findIndex(
        (item) => item.fullPath === state.previousRoute.fullPath
      )
      if (index !== -1) {
        TagsStoreId.tagsList[index] = {
          path: path,
          fullPath: fullPath,
          title: (router.currentRoute.value.query.tabTitle ? router.currentRoute.value.query.tabTitle : router.currentRoute.value.meta.title) as string,
          name: router.currentRoute.value.name as string
        }
      }
    } else {
      // 新建标签tabs
      if (TagsStoreId.tagsList.length >= 50) {
        TagsStoreId.delTagsItem({ index: 0 })
      }
      TagsStoreId.setTagsItem({
        path: path,
        fullPath: fullPath,
        title: (router.currentRoute.value.query.tabTitle ? router.currentRoute.value.query.tabTitle : router.currentRoute.value.meta.title) as string,
        name: router.currentRoute.value.name as string
      })
      scrollInit(true)
    }
  } else {
    scrollTagToCenter(fullPath)
  }
}

// 将标签滚动到中间
const scrollTagToCenter = (fullPath: string) => {
  nextTick(() => {
    // 父级元素宽度
    const scrollContent = document.querySelector('#scroll-content') as HTMLElement
    const scrollContentWidth = scrollContent.offsetWidth
    // 父级元素里面找当前路由标签距离左边距离
    const currentTag = scrollContent.querySelector(`[href="#${fullPath}"]`) as any
    const offsetLeft = currentTag.parentElement.offsetLeft
    if (state.scroll) {
      if (scrollContentWidth - offsetLeft < scrollContentWidth / 2) { // 全部标签总长度 - 要跳转标签位置 < 滚动框一半时，滚动至最右边
        state.scroll.scrollTo(state.scroll.maxScrollX, 0)
      } else if (offsetLeft < scrollContentWidth / 2) { // 要跳转标签位置 < 滚动框一半时，滚动至最左边
        state.scroll.scrollTo(0, 0, 0)
      } else { // 将标签滚动到中间
        state.scroll.scrollTo(scrollContentWidth / 2 - offsetLeft, 0)
      }
    }
  })
}

// 设置加入缓存
const toKeepAlive = (to: RouteLocationNormalized) => {
  TagsStoreId.setKeepAlive({ to })
}
// // 路由钩子监听路由变化
// onBeforeRouteUpdate((to) => {
//   console.log('onBeforeRouteUpdate')
//   setTags(to.path, to.fullPath)
//   toKeepAlive(to)
// })
// onBeforeRouteLeave((to: any, from: any, next: any) => {
//   console.log('onBeforeRouteLeave')
//   // console.log('to:', to)
//   // console.log('from', from)
//   setTags(to.path, to.fullPath)
//   toKeepAlive(to)
//   next()
// })

// 判断是否是首页
const isNoClose = (fullPath: string) => {
  return fullPath !== '/home'
}

// 判断当前路由
const isActive = (fullPath: string) => {
  return fullPath === router.currentRoute.value.fullPath
}

// 关闭当前标签
const closeTags = (index: number) => {
  const delItem = TagsStoreId.tagsList[index]
  TagsStoreId.delTagsItem({ index }) // 删除对应标签
  TagsStoreId.clearKeepAlive({ name: router.currentRoute.value.name }) // 清空对应缓存
  // 关闭当前标签-跳转到上一个标签或者首页
  const item = TagsStoreId.tagsList[index]
    ? TagsStoreId.tagsList[index]
    : TagsStoreId.tagsList[index - 1]
  if (item) {
    // delItem.path === this.$route.fullPath && this.$router.push(item.path)
    delItem.path === router.currentRoute.value.path && router.push(item.fullPath)
  } else {
    router.push('/home')
  }
  scrollInit(false)
}

// 操作菜单关闭
const handleTags = (command: string) => {
  // 刷新当前页面
  if (command === 'refresh') {
    TagsStoreId.clearKeepAlive({ name: router.currentRoute.value.name }) // 清空对应缓存
    reloadRouter() // 刷新
    nextTick(() => {
      toKeepAlive(router.currentRoute.value) // 加入缓存
    })
  }
  // 关闭当前页面
  if (command === 'close') {
    let _index = -1
    const _isExist = TagsStoreId.tagsList.some((item, index) => {
      if (item.path === router.currentRoute.value.path) {
        _index = index
      }
      return item.path === router.currentRoute.value.path
    })
    if (router.currentRoute.value.path === '/home') {
      ElMessage({ message: '不能关闭首页' })
      return
    }
    if (_isExist) {
      closeTags(_index)
    }
  }
  // 关闭所有-回到首页
  if (command === 'all') {
    TagsStoreId.clearTags()
    if (router.currentRoute.value.path !== '/home') {
      router.push('/home')
    }
    scrollInit(false)
  }
  // 关闭其他-保留首页
  if (command === 'other') {
    let curItem = TagsStoreId.tagsList.filter((item) => {
      return item.fullPath === router.currentRoute.value.fullPath
    })
    if (curItem[0].fullPath === '/home') {
      curItem = []
    }
    TagsStoreId.closeTagsOther(curItem)
    const _route: any = router.currentRoute.value
    TagsStoreId.clearOtherKeepAlive(_route)
    scrollInit(false)
  }
}

// 监听路由变化
watch(
  () => router.currentRoute.value,
  (to: any) => {
    // debugger
    // true：保持路由在当前标签，否则新建标签
    // if (to.meta.keepTags) {
    //   currentTags(to.path, to.fullPath)
    // } else {
    //   setTags(to.path, to.fullPath)
    //   toKeepAlive(to)
    // }
    setTags(to.path, to.fullPath, to)
    toKeepAlive(to)
    state.previousRoute = to // Update the previous route
  },
  { immediate: true }
)

// vue组件初始化之后-执行
onMounted(() => {
  // debugger
  setTags(router.currentRoute.value.path, router.currentRoute.value.fullPath, router.currentRoute.value)
  toKeepAlive(router.currentRoute.value)
})
</script>
<style lang="scss" scoped>
.box {
  background: #fff;
  .tags-box {
    position: relative;
    height: 40px;
    overflow: hidden;
    background: #fff;
    margin-right: 40px;
    padding-left: 5px;
    margin-left: -5px;
    // box-shadow: 0 5px 10px #ddd;
    .scroll-wrapper {
      flex-grow: 1;
      height: 40px;
      white-space: nowrap;
      .scroll-content {
        display: inline-block;
        padding-right: 20px;
      }
      .tags-li {
        display: inline-block;
        margin: 5px 8px 0 0;
        border-radius: 3px;
        font-size: 12px;
        overflow: hidden;
        cursor: pointer;
        height: 30px;
        line-height: 30px;
        border: 1px solid #e9eaec;
        background: #fff;
        padding: 0 10px;
        vertical-align: middle;
        color: #666;
        -webkit-transition: all 0.3s ease-in;
        -moz-transition: all 0.3s ease-in;
        transition: all 0.3s ease-in;
        .tags-li-icon {
          display: inline-block;
          text-align: center;
          line-height: 10px;
          width: 10px;
          height: 10px;
          right: 4px;
          top: 9px;
          font-size: 13px;
          border-radius: 10px;
          padding: 2px;
        }
        .tags-li-icon:hover {
          background-color: #e0e0e0;
        }
      }
      .tags-li-right {
        padding: 0 20px 0 10px;
      }

      .tags-li:not(.active):hover {
        background: #f8f8f8;
      }

      .tags-li.active {
        color: var(--el-color-primary);
        background: var(--el-color-primary-light-9);
        border-color: var(--el-color-primary);
        animation: bounce-in 0.25s;
      }
      .tags-li-title {
        float: left;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        /*margin-right: 5px;*/
        color: #666;
      }
      .tags-li.active .tags-li-title {
        color: var(--el-color-primary);
      }
    }
  }
  .tags-close-box {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    text-align: center;
    width: 18px;
    height: 40px;
    background: #fff;
    // box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.25);
    }
    100% {
      transform: scale(1);
    }
  }
}

.tabs-more {
  position: relative;
  display: inline-block;
  padding: 3px 5px;
  &-active,
  &:hover {
    &:after {
      position: absolute;
      bottom: -1px;
      left: 0;
      height: 0;
      content: '';
    }
    .tabs-more-icon {
      transform: rotate(90deg);
      .box-t {
        &:before {
          transform: rotate(45deg);
        }
      }
      .box:before,
      .box:after {
        background: var(--el-color-primary);
      }
    }
  }
  &-icon {
    display: inline-block;
    color: #9a9a9a;
    cursor: pointer;
    transition: transform 0.3s ease-out;
    .box {
      position: relative;
      display: block;
      width: 14px;
      height: 8px;
      background-color: transparent;
      &:before {
        position: absolute;
        top: 0;
        left: 0;
        width: 6px;
        height: 6px;
        content: '';
        background: #9a9a9a;
      }
      &:after {
        position: absolute;
        top: 0;
        left: 8px;
        width: 6px;
        height: 6px;
        content: '';
        background: #9a9a9a;
      }
    }
    .box-t {
      &:before {
        transition: transform 0.3s ease-out 0.3s;
      }
    }
  }
}
:deep(.el-dropdown-link) {
  outline: none !important;
}
</style>
