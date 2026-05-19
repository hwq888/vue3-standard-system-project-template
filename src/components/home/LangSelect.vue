<!-- 语言选择 -->
<template>
  <div class="box">
    <el-dropdown @command="handleSetLanguage" placement="bottom-end" size="default">
      <span class="el-dropdown-link">
        {{ state.languageName }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(item, index) in languageArr"
            :command="item.value"
            :key="index"
            >{{ item.name }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { globalConfig } from '@/globalSettings'
import { langStore } from '@/stores/lang'
const router = useRouter()

// 国际化状态管理
const langStoreId = langStore()

const {
  setting: { defaultLang }
} = globalConfig
// 参数管理
// const props = defineProps({
//   textColor: {
//     type: String,
//     default: '#fff'
//   }
// })
// 状态管理
const state = reactive({
  language: '',
  languageName: ''
})
// 语言配置
const languageArr = ref([
  { name: '简体中文', value: 'zh' },
  { name: 'English', value: 'en' }
])
// 设置语言
const { locale } = useI18n()
const handleSetLanguage = (lang: string) => {
  if (lang === state.language) return
  localStorage.setItem('lang', lang) // 存储到localStorage
  locale.value = lang // 配置到I18n
  langStoreId.updateLang(lang) // 存储到store，更新到element plus的语言库
  reload()
}
// 获取语言配置
const getLanguage = () => {
  const _lang = localStorage.lang || defaultLang // 获取语言配置
  const exist = languageArr.value.some((i) => i.value === _lang) // 判断语言标签是否属于语言库的配置
  if (exist) {
    const _arr: any = languageArr.value.filter((item: any) => {
      return item.value === _lang
    })
    state.language = _arr[0].value
    state.languageName = _arr[0].name
  }
}

// 刷新网页
const reload = () => {
  // console.log('reload')
  router.go(0)
}

// 监听路由变化
// watch(
//   () => router.currentRoute.value,
//   () => {
//     getLanguage()
//   },
//   { immediate: true }
// )

onMounted(() => {
  getLanguage()
})
</script>
<style scoped lang="scss">
.box {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}
.el-dropdown-link {
  cursor: pointer;
  outline: none;
  font-size: 14px;
}
:deep(.el-dropdown) {
  --color: inherit;
  color: var(--color);
}
</style>
