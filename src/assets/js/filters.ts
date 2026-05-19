/*
全局Vue过滤器
 */
/** 根据val值查询[{val:'',name:''}]的name值(数字类型的比对)
 * @param val {Number} 传入的val值
 * @param obj {obj} 数组对象[{val:'',name:''}]
 **/
export const optionVal = (val: number, obj: any[]) => {
  // 后台异常状态比较多，异常状态显示接口返回的值
  const arr = obj.filter((item: { val: string | number }) => +item.val === +val)[0]
  return arr ? arr.name : val
}
/** 根据val值查询[{val:'',name:''}]的name值(字符串类型的比对)
 * @param val {String} 传入的val值
 * @param obj {obj} 数组对象[{val:'',name:''}]
 **/
export const optionStringVal = (val: any, obj: any[]) => {
  // 后台异常状态比较多，异常状态显示接口返回的值
  // eslint-disable-next-line eqeqeq
  const arr = obj.filter((item) => item.val == val)[0]
  return arr ? arr.name : val
}
/** 金额千分位格式化
 * @param num {Number} 金额
 * @param digits {Number} 保留小数点后几位数 默认保留两位小数
 **/
export const addThousandSign = (num: any, digits = 2) => {
  if (typeof num === 'number') {
    // 直接使用 number 类型的 num，不需要 parseFloat
    const formattedNum = num.toFixed(digits)
    return formattedNum.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,')
  } else {
    return ''
  }
}
/** 金额单位
 * @param num {Number} 金额
 * @param unit {String} 单位
 **/
export const addAmountUnit = (num: any, unit = 'Rp') => {
  return `${unit} ${num}`
}
/** 每4个字符加空格
 * @param str {Number} 字符
 **/
export const addSpaceBetween4 = (str: any) => {
  return str
    .replace(/\D+/g, '')
    .replace(/(\d{4})/g, '$1 ')
    .replace(/(\s*$)/g, '')
}
/** 去除空格
 * @param str {Number} 字符
 **/
export const clearSpace = (str: string) => {
  return str.replace(/\D+/g, '')
}
/** 判空返回---
 * @param val {Number | String} 值
 **/
export const nullFormat = (val: string | null) => {
  if (val === null || typeof val === 'undefined' || val === '') {
    return '---'
  } else {
    return val
  }
}
