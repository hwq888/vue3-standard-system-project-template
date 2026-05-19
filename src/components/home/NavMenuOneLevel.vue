<!-- 菜单组件 - 一级菜单 -->
<template>
  <div v-loading="state.menuLoading">
    <el-scrollbar wrap-class="nav-left-scroll">
      <div class="nav-menu-box" :class="{ 'nav-menu-box-column': props.mode === 'column' }">
        <div class="level-one-menu-item" v-for="(item, index) in state.menuList" :key="index">
          <!-- 一级 菜单权限并且携带url可跳转 -->
          <template v-if="MenuController(item.rightUrl)">
            <p class="menu-item" :class="{ active: state.activeIndex === index }" :key="item.id" :index="item.rightUrl" @click="getMeunChildrenData(item, index)">
              <i :class="`${getMenuIcon(item.rightUrl)}`"></i>
              <span class="ml5">{{ item.rightName }}</span>
            </p>
          </template>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { menuStore } from '@/stores/menuStore'
import { themeStore } from '@/stores/theme'
import { reactive, onMounted, computed, watch} from 'vue'
import { useRouter } from 'vue-router'
import utils from '@/assets/js/utils'
import themes from '@/assets/css/theme/themes'
const router = useRouter()
// 参数管理
const props = defineProps(['mode'])

// 菜单状态管理
const MenuStoreId = menuStore()
const themeStoreId = themeStore()

// 声明初始对象类型
interface Menu {
  id: string
  rightType: number
  rightUrl: string
  rightName: string
  treeData: Menu[]
}

// 状态管理工具
const state = reactive({
  menuLoading: false,
  currentPath: '',
  activeIndex: 0, // 当前选中菜单索引
  menuList: [] as Menu[],
  routesList: router.getRoutes(),
  // 数组转字符串的权限树
  // menuPaths: '',
  isCollapse: computed(() => {
    return MenuStoreId.isHideFullNavMenu
  }),
  menuBackgroundColor: computed(() => {
    return themes[themeStoreId.themeName as keyof typeof themes]['menuBackgroundColor']
  }),
  menuTextColor: computed(() => {
    return themes[themeStoreId.themeName as keyof typeof themes]['menuTextColor']
  }),
  menuActiveTextColor: computed(() => {
    return themes[themeStoreId.themeName as keyof typeof themes]['menuActiveTextColor']
  })
})

interface iconMap {
  [key: string]: any
}
const iconRightNameMap: iconMap = {
  'ico-zijinfang': 'zijinfang',
  'ico-jiesuanguanli': 'jiesuanguanli',
  'ico-jicheng': 'jicheng'
}
// 匹配路由图标
const getMenuIcon = (routePath: string) => {
  if (!routePath) {
    return ''
  }
  const iconName = iconRightNameMap[String(routePath)]
  if (iconName) {
    return 'iconfont iconFontMenu icon-' + iconName
  } else {
    return ''
  }
}
// 菜单初始化
const getMenuData = () => {
  state.menuList = utils.getLocalStorage('UserPowerTreeData')
  state.currentPath = router.currentRoute.value.path
  // 获取当前路由的菜单索引
  state.activeIndex = findTopMenuIndex(state.menuList, state.currentPath)
  // 传输当前路由的子菜单到左边栏菜单
  getMeunChildrenData(state.menuList[state.activeIndex], state.activeIndex)
}
// 菜单显示/隐藏控制器
const MenuController = (rightUrl: string) => {
  // 需要隐藏的菜单
  const hideMenu = ['/PublicConfiguration']
  return !hideMenu.includes(rightUrl)
}
// 一级菜单点击事件
const getMeunChildrenData = (item: any, index: number) => {
 if (item.treeData.length > 0) {
  state.activeIndex = index
  // utils.setLocalStorage('ColumnMenuListIndex', index) // 记录当前菜单索引
  MenuStoreId.updateColumnMenuList(item.treeData)
 } else {
  router.push(item.rightUrl)
 }
}
// 根据路由获取菜单一级数组的索引
const findTopMenuIndex = (menuData: any[], targetUrl: string) => {
  // 遍历顶级菜单
  for (let topIndex = 0; topIndex < menuData.length; topIndex++) {
    const topMenu = menuData[topIndex]
    // 递归搜索函数
    const searchInTree = (node: any) => {
      // 检查当前节点是否匹配
      if (node.rightUrl === targetUrl) {
        return true
      }
      // 检查当前节点的 treeData
      if (node.treeData && node.treeData.length > 0) {
        for (const child of node.treeData) {
          if (searchInTree(child)) {
            return true
          }
        }
      }
      return false
    }
    // 从顶级菜单开始搜索
    if (searchInTree(topMenu)) {
      return topIndex
    }
  }
  return 0 // 未找到
}

// 监听路由变化
watch(
  () => router.currentRoute.value,
  (to: any) => {
    state.currentPath = to.path
  },
  { immediate: true }
)
// 加载后运行
onMounted(() => {
  MenuStoreId.initNavMenu()
  getMenuData()
})
</script>

<style lang="scss" scoped>
.nav-menu-box {
  margin-left: 30px;
  :deep(.iconFontMenu) {
    font-size: 15px;
  }
  .level-one-menu-item {
    height: 60px;
    line-height: 60px;
    display: inline-block;
    font-size: 15px;
    .menu-item {
      color: #ffffff;
      padding: 0 20px;
      cursor: pointer;
    }
    .active {
      @include font_color('menuActiveTextColor');
    }
  }
}
.nav-menu-box-column {
  display: flex;
  flex-direction: row;
  margin-left: 30px;
}
</style>
