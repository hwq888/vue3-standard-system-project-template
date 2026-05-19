<!-- 设置组件 -->
<template>
  <div class="box">
    <el-icon @click="toggleDrawer"><Setting /></el-icon>
    <el-drawer v-model="state.drawer" direction="rtl" :title="state.title" size="280px">
      <el-scrollbar class="theme-scrollbar">
        <div class="el-drawer-body">
          <el-form ref="form" label-position="left" label-width="40px">
            <el-divider content-position="center"> 常用设置 </el-divider>
            <el-form-item>
              <template #label>
                <label class="el-form-item__label">布局</label>
              </template>
              <el-select v-model="themeStoreId.layout" @change="setLayout">
                <el-option
                  v-for="item in layoutArr"
                  :key="item.value"
                  :value="item.value"
                  :label="item.name"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="主题">
              <el-select v-model="themeStoreId.themeName" @change="setTheme">
                <el-option
                  v-for="item in themeArr"
                  :key="item.value"
                  :value="item.value"
                  :label="item.name"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { Setting } from '@element-plus/icons-vue'
import { themeStore } from '@/stores/theme'
import { globalConfig } from '@/globalSettings'
import { menuStore } from '@/stores/menuStore'
// 全局配置
const {
  theme: { themeName }
} = globalConfig
// import { ElMessage } from 'element-plus'
// 主题状态管理
const themeStoreId = themeStore()
const MenuStoreId = menuStore()
// 状态管理
const state = reactive({
  drawer: false,
  title: '主题配置'
})
// 布局数据
const layoutArr = ref([
  { name: '纵向', value: 'vertical' },
  { name: '横向', value: 'horizontal' },
  { name: '分栏', value: 'column' }
])
// 主题数据
const themeArr = ref([
  { name: '黑蓝', value: 'blueblack' },
  // { name: '蓝白', value: 'bluewhite' },
  { name: '黑绿', value: 'greenblack' },
  // { name: '绿白', value: 'greenwhite' },
  { name: '黑紫', value: 'purpleblack' },
  // { name: '紫白', value: 'purplewhite' },
  { name: '黑红', value: 'redblack' },
  // { name: '红白', value: 'redwhite' },
  { name: '蓝色', value: 'blue' },
  // { name: '纯黑', value: 'black' },
  { name: '绿色', value: 'green' },
  { name: '紫色', value: 'purple' },
  { name: '红色', value: 'red' }
])

// 布局切换
const setLayout = (val: string) => {
  themeStoreId.updateLayout(val)
  // 横向  菜单不收缩
  if (val === 'horizontal') {
    MenuStoreId.updateIsShowFullNavMenu(false)
  }
}

// 主题切换
const setTheme = (val: string) => {
  //修改html的主题
  localStorage.setItem('themeName', val)
  window.document.documentElement.setAttribute('data-theme', val)
  themeStoreId.updateThemeName(val)
  // import(`@/assets/css/theme/element-plus/theme-chalk-${val}.css`);
}

// 展开收起
const toggleDrawer = () => {
  state.drawer = true
}

// 挂载之后执行
onMounted(() => {
  setTheme(localStorage.themeName || themeName)
})
</script>
<style lang="scss" scoped>
.box {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
  .el-drawer-body {
    padding: 0;
    margin: 0;
  }
}
</style>
