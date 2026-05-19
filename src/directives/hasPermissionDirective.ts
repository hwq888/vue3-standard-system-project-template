import type { Directive, DirectiveBinding } from 'vue'
import Utils from '@/assets/js/utils'
import router from '@/router'

// 定义指令
const hasPermissionDirective: Directive<HTMLElement> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string[]>) {
    const { value } = binding
    const { path } = router.currentRoute.value
    const pathUrl = value[1] ? value[1] : path
    const getChildrenArr = Utils.getChildrenPower(pathUrl, undefined) as any
    if (getChildrenArr) {
      let hasPermissions = false
      try {
        value.forEach((item) => {
          hasPermissions = Utils.HavePowerFn(getChildrenArr, item)
          if (hasPermissions) {
            throw new Error('')
          }
        })
      } catch (e) {
        return true
        // throw new Error(e);
      }
      if (!hasPermissions) {
        el.parentNode?.removeChild(el)
      }
    } else {
      throw new Error('请设置操作权限标签值')
    }
  }
}

// 导出指令
export default hasPermissionDirective
