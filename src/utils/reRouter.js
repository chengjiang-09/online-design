import router from 'vue-router'

let originPush = router.prototype.push
let originReplace = router.prototype.replace

//重写push方法
router.prototype.push = function (location, res, rej) {
  if (res && rej) {
    originPush.call(this, location, res, rej)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {},
    )
  }
}
//重写replace方法
router.prototype.replace = function (location, res, rej) {
  if (res && rej) {
    originReplace.call(this, location, res, rej)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {},
    )
  }
}
