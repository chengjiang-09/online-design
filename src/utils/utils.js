/**
 * 深拷贝
 *
 * @param {*} obj
 * @returns
 */
export const deepCopy = (obj) => {
  const copyObj = {}
  Object.keys(obj).forEach((key) => {
    if (Array.isArray(obj[key])) {
      copyObj[key] = []
      obj[key].forEach((val) => {
        if (Object.prototype.toString.call(val) === '[object Object]') {
          copyObj[key].push(deepCopy(val))
        } else {
          copyObj[key].push(val)
        }
      })
    } else if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
      copyObj[key] = deepCopy(obj[key])
    } else {
      copyObj[key] = obj[key]
    }
  })
  return copyObj
}

/**
 * 找到修改的child
 *
 * @param {*} children
 * @param {*} id
 * @returns
 */
export const findChildChart = (children, id) => {
  let chart = null

  const fn = (children, id) => {
    let childrenLength = children.length
    for (let i = 0; i < childrenLength; i++) {
      if (children[i].id === id) {
        chart = children[i]
      } else if (children[i].children.length !== 0) {
        fn(children[i].children, id)
      }
    }
  }
  fn(children, id)
  return chart
}

/**
 * 判断对象是否为空
 *
 * @param {*} object
 */
export const isEmpty = (object) => {
  for (let key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      return false
    }
  }
  return true
}

/**
 *
 * 生成随机数
 *
 * @param {*} min 最小值
 * @param {*} max 最大值
 * @returns
 */
export const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

/**
 * 生成随机颜色
 *
 * @returns
 */
export function randomRgb(min = 0, max = 256) {
  let r = randomNum(min, max)
  let g = randomNum(min, max)
  let b = randomNum(min, max)

  return `rgb(${r},${g},${b})`
}

/**
 *
 * 生成指定长度的随机字符串
 *
 * @param {*} len 随机字符串长度
 * @returns 随机串
 */
export function randomStr(len) {
  const str = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789'
  const strLen = str.length
  let code = ''
  for (let i = 0; i < len; i++) {
    code = code.concat(str.charAt(Math.floor(Math.random() * strLen)))
  }
  return code
}

/**
 * 简单的校验封装
 *
 * @param value 需要校验的字段
 * @param rules 正则校验规则
 * @returns
 */
export function verifyRegularByRE(value, rules) {
  let re = new RegExp(rules)
  return re.test(value)
}

/**
 * 将JSON数据转换为FormData，允许传入多层嵌套对象
 *
 * @param {Object} obj 传入需要转换的json数据
 * @return {String} 返回FormData数据
 */
export function JSONSwitchFormData(JSONData) {
  let formData = new FormData()

  function switchFn(JSONData) {
    Object.keys(JSONData).forEach((key) => {
      if (Array.isArray(JSONData[key])) {
        JSONData[key].forEach((val) => {
          formData.append(key, val)
        })
      } else if (
        Object.prototype.toString.call(JSONData[key]) == '[object Object]'
      ) {
        switchFn(JSONData[key])
      } else {
        formData.set(key, JSONData[key])
      }
    })
  }

  switchFn(JSONData)
  return formData
}
