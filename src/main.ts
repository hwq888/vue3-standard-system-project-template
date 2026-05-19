import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { sysName } from '@/globalSettings' // 假设从配置文件导入标题

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './assets/css/base.scss'
// import './assets/css/theme/handleThemes.scss'
// import './assets/css/transition.scss'
import './assets/font/iconfont.css'

import { setupI18n } from '@/i18n/i18n'
import directives from './directives'

const app = createApp(App)
app.use(directives) // 全局注册指令
app.use(setupI18n) // 使用国际化i18n
app.use(createPinia()) // 使用pinia
app.use(router) // 使用路由
app.use(ElementPlus, { size: 'default', zIndex: 3000 }) // 使用ElementPlus
// 设置初始 title
document.title = sysName
app.mount('#app')
