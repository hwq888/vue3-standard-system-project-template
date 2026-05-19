/***
 * 国际化函数
 * 根据文本返回对应的“t对象文本”
 * @parasm
 * te:函数用于检查是否存在该翻译文本的翻译
 * t:函数用于翻译文本
 * tm:获取多层次的翻译消息的函数
 * ****/
// import { useI18n } from 'vue-i18n'
import { i18n } from './i18n'
const { t, te, tm } = i18n.global

/***
 * 根据文本返回langI18n对应的“t对象文本”
 * ****/
export function translateLang(text: string, variables: Record<string, any> = {}) {
  // const { t, te } = useI18n()
  if (te(`langI18n.${text}`)) return t(`langI18n.${text}`, variables)
  return text
}
/***
 * 根据文本返回configObject对应的“tm多层次对象函数”
 * ****/
export function translateConfigObjLang(path: string) {
  // const { te, tm } = useI18n()
  if (te(`configObject.${path}`)) return tm(`configObject.${path}`) as object
  return path
}
