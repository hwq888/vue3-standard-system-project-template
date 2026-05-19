export const sysName: string = '资金综合业务管理系统' // SSO系统标识的系统名称
export const sysDomainCode: string = 'fund-zonghe-admin' // SSO系统标识的系统名称
export const sysSsoApi: string = '/sso-service' // SSO系统API请求前缀
export const sysApi: string = '/fund-deposit-admin' // 此系统API请求前缀
// 全局参数配置
export const globalConfig: any = {
  setting: {
    defaultLang: 'zh', // 默认国际化语言-中文
    showLang: true, // 显示国际化
    showFullScreen: true, // 显示满屏
    showMessages: true, // 显示消息
    showSetUp: true // 显示设置
  },
  theme: {
    layout: localStorage.layout || 'vertical', // 布局
    themeName: localStorage.themeName || 'blueblack' // 主题
  }
}
