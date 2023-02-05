const componentList = require.context('./', false, /\.vue$/)

//designUI是左侧侧边栏，不同模板对应的组件库

export default {
  install(app) {
    componentList.keys().forEach((key) => {
      const component = componentList(key).default
      app.component(component.name, component)
    })
  },
}
