/**
 * Creation time:2021/9/28.
 */
// import store from '@/store'
export default {
  /*
   *说明：localStorage存储对象
   * key：对象  obj：对象的值
   * */
  setLocalStorage(key: string, obj: any) {
    localStorage.setItem(key, JSON.stringify(obj))
  },
  /*
   *说明：获取localStorage获取对象数据
   *key：对象
   * */
  getLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key) as string)
  },
  /*
   *说明：localStorage删除对象
   * key：对象  obj：对象的值
   * */
  delLocalStorage(key: string) {
    localStorage.removeItem(key)
  },
  /*
   *说明：localStorage删除所有
   * key：对象  obj：对象的值
   * */
  delAllLocalStorage() {
    localStorage.clear()
  },
  /*
   *说明：设置cookie方法
   *key：对象  val：对象的值   time：过去时间（小时）
   * */
  setCookie(key: string, val: string, time: any) {
    if (time) {
      const date = new Date() // 获取当前时间
      const hours = time // 将date设置为n小时以后的时间
      date.setTime(date.getTime() + hours * 3600 * 1000) // 格式化为cookie识别的时间
      document.cookie = key + '=' + val + ';expires=' + date.toString() // 设置cookie
    } else {
      document.cookie = key + '=' + val
    }
  },
  /*
   *说明：获取cookie方法
   *key：对象
   * */
  getCookie(key: string) {
    // const getCookie = document.cookie.replace(/[ ]/g, '') // 获取cookie，并且将获得的cookie格式化，去掉空格字符
    const getCookie = document.cookie.replace(/(^\s*)|(\s*$)/g, '') // 获取cookie，并且将获得的cookie格式化，去掉两边空格字符
    const arrCookie = getCookie.split(';') // 将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
    let tips // 声明变量tips
    for (let i = 0; i < arrCookie.length; i++) {
      // 使用for循环查找cookie中的tips变量
      const newArrCookie = arrCookie[i].replace(/(^\s*)|(\s*$)/g, '')
      const arr = newArrCookie.split('=') // 将单条cookie用"等号"为标识，将单条cookie保存为arr数组
      if (key === arr[0]) {
        // 匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
        tips = arr[1] // 将cookie的值赋给变量tips
        break // 终止for循环遍历
      }
    }
    return tips
  },
  /*
   *说明：删除cookie方法
   *key：对象
   * */
  deleteCookie(key: string) {
    // 删除cookie方法
    const date = new Date() // 获取当前时间
    date.setTime(date.getTime() - 10000) // 将date设置为过去的时间
    document.cookie = key + '=v; expires =' + date.toString() // 设置cookie
  },
  /** 金额千分位格式化
   * @param num {Number} 金额
   * @param digits {Number} 保留小数点后几位数
   **/
  addThousandSign(num: string | number, digits: number | undefined) {
    num = Number(num)
    num = '' + num.toFixed(digits)
    return num.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,')
  },
  /** 删除金额千分位格式化
   * @param num {String} 金额
   **/
  delThousandSign(num: string) {
    const x = num.split(',')
    return parseFloat(x.join(''))
  },
  /** 获取字符串指定前几位
   * @param str {String} 原字符串
   * @param num {Number} 需求的位数
   **/
  getStrFirstPart(str: string, num: number) {
    str = '' + str
    num = Number(num)
    if (num > str.length) {
      num = str.length
    }
    return str.slice(0, num)
  },

  /** 获取字符串指定最后几位
   * @param str {String} 原字符串
   * @param num {Number} 需求的位数
   **/
  getStrLastPart(str: string | any[], num: number) {
    str = '' + str
    num = Number(num)
    return str.slice(-num)
  },
  /** 获取url对象key的值
   **/
  getUrlParam(name: string) {
    // eslint-disable-next-line no-useless-escape
    const reg = new RegExp('(^|[&?])' + name + '=([^&]*)(&|$)')
    const searchString = location.hash ? location.hash : window.location.search.substring(1)
    const r = searchString.match(reg)
    if (r != null) {
      return decodeURIComponent(r[2])
    }
  },
  /*
   * 说明：数组乱序
   * a：数组对象
   * */
  shuffle(a: []) {
    for (let i = a.length; i; i--) {
      const j = Math.floor(Math.random() * i)
      ;[a[i - 1], a[j]] = [a[j], a[i - 1]]
    }
    return a
  },
  // 数组去重
  removeRepeatItem(arr: string | any[]) {
    const newArr = []
    for (let i = 0; i < arr.length; i++) {
      if (newArr.indexOf(arr[i]) === -1) {
        newArr.push(arr[i])
      }
    }
    return newArr
  },
  /*
   *说明：对象复制
   *data：参数传递
   * */
  dataClone(data: any) {
    let obj = {}
    obj = JSON.parse(JSON.stringify(data))
    return obj
  },
  // 获取权限的某个节点的children集合
  getChildrenPower(url: string, obj: any) {
    const myObj = obj || this.getLocalStorage('UserPowerTreeData') || []
    let tempArr: never[] = []
    let havefind = false
    function getName(myObj: string | any[]) {
      for (let i = 0; i < myObj.length; i++) {
        if (myObj[i].rightUrl === url) {
          havefind = true
          tempArr = myObj[i].treeData
        } else {
          if (!havefind && myObj[i].treeData && myObj[i].treeData.length > 0) {
            getName(myObj[i].treeData)
          }
        }
      }
    }
    getName(myObj)
    const arr = []
    for (const k in tempArr) {
      arr.push({
        id: tempArr[k]['id'],
        rightName: tempArr[k]['rightName'],
        rightUrl: tempArr[k]['rightUrl'],
        rightType: tempArr[k]['rightType'],
        rightCode: tempArr[k]['rightCode']
      })
    }
    return arr
  },
  // 判断按钮或者页面是否有权限(不再使用，请用指令 v-has-permission="['edit', 'delete']"  写入)
  // IsHavePower(url: any, val: any) {
  //   const arr = this.getChildrenPower(url)
  //   let myFlag = false
  //   for (const i in arr) {
  //     if (arr[i].rightName === val || arr[i].rightCode === val) {
  //       myFlag = true
  //     }
  //   }
  //   return myFlag
  // },
  // 判断按钮或者页面是否有权限
  HavePowerFn(
    obj: {
      [x: string]: {
        rightName: string
        rightCode: string
      }
    },
    val: any
  ) {
    let myFlag = false
    for (const i in obj) {
      if (obj[i].rightName === val || obj[i].rightCode === val) {
        myFlag = true
      }
    }
    return myFlag
  },
  // 获取所有菜单的子路径
  getChildrenObjectList(objList: string | any[]) {
    const objArr: never[] = []
    for (let i = 0; i < objList.length; i++) {
      this.getChildrenObject(objList[i], objArr)
    }
    // console.log(objArr)
    return objArr
  },
  getChildrenObject(obj: { children: string | any[] }, objArr: any[]) {
    if (obj.children) {
      for (let i = 0; i < obj.children.length; i++) {
        this.getChildrenObject(obj.children[i], objArr)
      }
    } else {
      objArr.push(obj)
    }
  },
  isEmpty(obj: string | any[]) {
    if (obj) {
      return obj.length === 0
    } else {
      return true
    }
  },
  deleteEmptyObject(test: { [x: string]: { treeData: any } }, recurse: any) {
    for (const i in test) {
      if (this.isEmpty(test[i].treeData)) {
        delete test[i].treeData
      } else if (recurse && typeof test[i].treeData === 'object') {
        this.deleteEmptyObject(test[i].treeData, recurse)
      }
    }
  },
  /*
   *比较时间大小
   * @desc d1 >= d2
   * */
  CompareDateTime(d1: string, d2: string) {
    return new Date(d1.replace(/-/g, '/')) >= new Date(d2.replace(/-/g, '/'))
  },
  objectToUrlParams(param: any, key: string | null, encode: null) {
    if (param == null) return ''
    let paramStr = ''
    const t = typeof param
    if (t === 'string' || t === 'number' || t === 'boolean') {
      paramStr += '&' + key + '=' + (encode == null || encode ? encodeURIComponent(param) : param)
    } else {
      for (const i in param) {
        const k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
        paramStr += '&' + this.objectToUrlParams(param[i], k, encode)
      }
    }
    return paramStr.substr(1)
  },
  // 解决丢失精度问题，保留x位小数
  roundDecimal(decimal: number, x: number) {
    return Math.round(decimal * Math.pow(10, x)) / Math.pow(10, x)
  }
}
