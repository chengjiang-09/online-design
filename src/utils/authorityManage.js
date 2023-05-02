//根据需要判断用户是否对画布头部导航栏按钮拥有权限
const permissions = {
  edit: 1,
  reading: 2,
  revoke: 4,
  redo: 8,
  actualReading: 16,
  editCanvas: 32,
  complete: 64,
  delete: 128,
}

//定义画布权限规则
export const rulesToChart = {
  author: [
    'edit',
    'reading',
    'revoke',
    'redo',
    'actualReading',
    'editCanvas',
    'complete',
    'delete',
  ],
  notAuthor: ['actualReading'],
}

//基本权限
export const basePermission = permissions.actualReading

/**
 * 判断是否拥有权限
 *
 * @param {*} permission
 * @param {*} type
 * @returns
 */
export const hasPermission = (permission, type) => {
  return permission & permissions[type]
}

/**
 * 添加权限
 *
 * @param {*} permission
 * @param {*} type
 * @returns
 */
export const addPermission = (permission, type) => {
  permission |= permissions[type]
  return permission
}

/**
 *
 * 按规则批量添加权限
 *
 * @param {*} permission
 * @param {Array} rules 权限规则
 * @returns
 */
export const batchAddPermission = (permission, rules) => {
  rules.forEach((rule) => {
    permission |= permissions[rule]
  })
  return permission
}

/**
 * 移除权限
 *
 * @param {*} permission
 * @param {*} type
 * @returns
 */
export const removePermission = (permission, type) => {
  permission &= ~permissions[type]
  return permission
}
