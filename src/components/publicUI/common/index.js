const componentList = require.context('./', false, /\.vue$/)

export default {
  install(app) {
    componentList.keys().forEach((key) => {
      const component = componentList(key).default
      app.component(component.name, component)
    })
  },
}
