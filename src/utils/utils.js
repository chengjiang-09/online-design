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
