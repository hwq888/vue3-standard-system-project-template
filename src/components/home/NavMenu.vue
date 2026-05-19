<!-- 菜单组件 -->
<template>
  <div v-loading="state.menuLoading">
    <el-scrollbar wrap-class="nav-left-scroll">
      <div class="nav-menu-box" :class="`nav-menu-box-${props.mode}`">
        <el-menu
          class="nav-menu"
          :default-active="state.currentPath"
          :collapse="state.isCollapse"
          router
          unique-opened
          :mode="props.mode === 'column' ? 'vertical' : props.mode"
          :ellipsis="false"
          :collapse-transition="false"
          :background-color="state.menuBackgroundColor"
          :text-color="state.menuTextColor"
          :active-text-color="state.menuActiveTextColor"
        >
          <template v-for="(item, index) in state.menuList">
            <!-- 一级 菜单权限并且携带url可跳转 -->
            <template v-if="item.rightUrl && item.treeData.length === 0">
              <el-menu-item :key="item.id" :index="item.rightUrl">
                  <i :class="`${getMenuIcon(item.rightUrl)}`"></i>
                  <span class="menu-name-1" :title="item.rightName">{{ item.rightName }}</span>
              </el-menu-item>
            </template>
            <!-- 二级菜单 -->
            <template v-else>
              <el-sub-menu :index="index + ''" :key="index + ''" popper-class="nav-menu_popper">
                <!-- 二级菜单标题 -->
                <template #title>
                    <i :class="`${getMenuIcon(item.rightUrl)}`"></i>
                    <span class="menu-name-1" :title="item.rightName">{{ item.rightName }}</span>
                </template>
                <!-- 处理二级菜单的子项 -->
                <template v-for="itemChild in item.treeData">
                  <!-- 如果存在三级菜单 并且 treeData长度 > 0 -->
                  <template v-if="itemChild.treeData.length > 0">
                    <el-sub-menu :index="itemChild.id + ''" :key="itemChild.id + ''">
                      <template #title>
                          <i :class="`${getMenuIcon(itemChild.rightUrl)}`"></i>
                          <span class="menu-name-1-1" :title="itemChild.rightName">{{itemChild.rightName}}</span>
                      </template>
                      <!-- 三级菜单的子项 -->
                      <template v-for="itemGrandChild in itemChild.treeData" :key="itemGrandChild.id">
                        <el-menu-item :index="itemGrandChild.rightUrl" v-if="MenuController(itemGrandChild)">
                            <i :class="`${getMenuIcon(itemGrandChild.rightUrl)}`"></i>
                            <span class="menu-name-1-1-1" :title="itemGrandChild.rightName">{{itemGrandChild.rightName}}</span>
                        </el-menu-item>
                      </template>
                    </el-sub-menu>
                  </template>
                  <!-- 如果没有三级菜单，正常显示二级菜单的子项 -->
                  <template v-else>
                    <el-menu-item :key="itemChild.id" :index="itemChild.rightUrl" v-if="MenuController(itemChild)">
                      <i :class="`${getMenuIcon(itemChild.rightUrl)}`"></i>
                      <span class="menu-name-1-1" :title="itemChild.rightName">{{itemChild.rightName}}</span>
                    </el-menu-item>
                  </template>
                </template>
              </el-sub-menu>
            </template>
          </template>
        </el-menu>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { menuStore } from '@/stores/menuStore'
import { themeStore } from '@/stores/theme'
import { reactive, onMounted, computed, watch, shallowRef} from 'vue'
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
  pid: string
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
  menuList: [] as Menu[],
  routesList: router.getRoutes(),
  // 数组转字符串的权限树
  menuPaths: '',
  isCollapse: computed(() => {
    return MenuStoreId.isHideFullNavMenu
  }),
  menuBackgroundColor: computed(() => {
    // return themes[themeStoreId.themeName]['menuBackgroundColor']
    return props.mode === 'column'
      ? '#f4f9ff'
      : themes[themeStoreId.themeName as keyof typeof themes]['menuBackgroundColor']
  }),
  menuTextColor: computed(() => {
    // return themes[themeStoreId.themeName]['menuTextColor']
    return props.mode === 'column'
      ? '#333333'
      : themes[themeStoreId.themeName as keyof typeof themes]['menuTextColor']
  }),
  menuActiveTextColor: computed(() => {
    const t = themes[themeStoreId.themeName as keyof typeof themes]
    // return themes[themeStoreId.themeName]['menuActiveTextColor']
    return props.mode === 'column'
      ? t['menuBackgroundColor'] === '#303133'
        ? t['menuActiveTextColor']
        : t['menuBackgroundColor']
      : t['menuActiveTextColor']
  })
})

interface iconMap {
  [key: string]: any
}
const iconRightNameMap: iconMap = {
  'ico-zijinfang': 'zijinfang',
  'ico-jiesuanguanli': 'jiesuanguanli',
  'ico-jicheng': 'jicheng',
  '/FundingPartyManage': 'zijinfangguanli',
  '/MarginManagement': 'zijinbaozhengjinguanli',
  '/RepaymentBudgetManagement': 'haikuanyusuanguanli',
  '/IntegratedManagement': 'jichengguanli'
}
// 匹配路由图标
const getMenuIcon = (routePath: string) => {
  if (!routePath) {
    return ''
  }
  const iconName = iconRightNameMap[String(routePath)]
  if (iconName) {
    return 'mr5 iconfont iconFontMenu icon-' + iconName
  } else {
    return ''
  }
}
// 获取菜单配置
const MenuPathInit = (_data: any) => {
  const _menu = _data
  let menuPath = []
  // 储存权限树存在的前端路由
  const rightUrls: any[] = []
  // 广度遍历权限树
  function BFS(tree: any[]) {
    const arr: any[] = []
    tree.forEach((item: { rightUrl: any; treeData: any }, i: number) => {
      if (item.rightUrl) {
        rightUrls.push(item.rightUrl)
      }
      // 将数组拆分成元素Push进新数组
      if (item.treeData) {
        arr.push(...item.treeData)
      }
      // 当前数组遍历完毕
      if (i === tree.length - 1) {
        // 如果没有子类，则跳出循环
        if (!arr.length) return rightUrls
        // 循环递归
        BFS(arr)
      }
    })
    return rightUrls
  }
  menuPath = BFS(_menu)
  return String(menuPath)
}
// 菜单初始化
const getMenuData = () => {
  // 分栏-布局-模式
  if (props.mode === 'column') {
    state.menuList = handleMenuData(MenuStoreId.columnMenuList)
  } else {
    state.menuList = handleMenuData(utils.getLocalStorage('UserPowerTreeData'))
  }
}
// 存储用户菜单path路由权限
const saveUserMenuPath = () => {
  state.menuList = utils.getLocalStorage('UserPowerTreeData')
  state.menuPaths = MenuPathInit(state.menuList)
  utils.setLocalStorage('UserPermissions', state.menuPaths) // 登记用户权限
  state.currentPath = router.currentRoute.value.path
}
// 处理菜单数据结构 过滤掉rightType=2的按钮类型数据
const handleMenuData = (data: any) => {
  // 递归处理菜单数据
  const processMenu = (items: any[]): any[] => {
    return items
      .filter(item => item.rightType !== 2) // 过滤掉 rightType = 2 的项
      .map(item => {
        // 创建新的对象以保持原始结构
        const newItem = { ...item }
        if (item.treeData && item.treeData.length > 0) {
          // 递归处理子菜单
          newItem.treeData = processMenu(item.treeData)
        }
        return newItem
      })
  }
  return processMenu(data)
}
// 菜单显示/隐藏控制器
const MenuController = (item: any) => {
  if (!item.rightUrl) {
    return true
  }
  let isShow = true
  const _routes = state.routesList
  for (let i = 0; i < _routes.length; i++) {
    if (item.rightUrl === _routes[i].path) {
      isShow = _routes[i].meta.isShow as boolean
    }
  }
  return isShow
}
// 监听MenuStoreId.columnMenuList变化 重新初始化菜单
watch(
  () => MenuStoreId.columnMenuList,
  () => {
    getMenuData()
  }
)
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
  saveUserMenuPath()
  getMenuData()
})
</script>

<style lang="scss" scoped>
:deep(.iconFontMenu) {
  font-size: 14px;
}
.nav-menu-box-horizontal {
  display: flex;
  flex-direction: row;
  :deep(.el-menu--horizontal) {
    border-bottom: 0;
  }
  :deep(.el-menu--horizontal>.el-menu-item.is-active) {
    border-bottom: 0;
  }
  :deep(.el-menu--horizontal > .el-sub-menu .el-sub-menu__title) {
    border-bottom: 0;
  }
}
.flex-grow {
  flex-grow: 1;
}
.nav-left.hide-nav-left {
  :deep(.el-icon-question:before) {
    margin-right: 6px !important;
  }
}

.nav-left-scroll {
  height: 100%;
}

.menu-name-1, .menu-name-1-1, .menu-name-1-1-1{
  display: inline-block;
  max-width: 110px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}
</style>
