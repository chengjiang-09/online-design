# online-design设计文档

## 一、目录结构

├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets             
│   ├── components   

- configureUI 右侧边栏各个样式对应的编辑组件库

										- designUI 左侧边栏各个模板对应的组件库

										- publicUI 一些公共组件库，例如右侧边栏内部的导航栏以及tabs组件， 										
										- functionality内存放一些功能组件，例如自定义的鼠标右击事件弹出的菜单栏

│   ├── mixins				#控制一些全局样式的混入
│   ├── mock                  #mock
│   ├── router                 # 路由
│   ├── store                 

- charts.js 存储组件左侧边栏模板数据仓库，以及画布数据
- app.js 全局样式控制仓库
- other.js 一些额外的配置仓库，具体看注释信息	

│   ├── styles                # 全局样式
│   ├── utils                  # 全局公用方法

- expirationTime.js 控制一些数据的持久化时间
- blackList.js  限制组件模板间嵌套的黑名单
- request.js axios封装

│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等

│   ├── defaultSettings                # 一些初始化时的默认配置，如vue-ls的基本配置项

│   └── permission.js          # 权限管理（未实现，现仅做路由跳转时跳转进度条）


## 三、数据结构

> 注意eCharts的数据结构有所不同

```json
[
  {
    "type": "layout", // 标识组件库类型
    "label": "布局", // 在左侧边栏导航栏中显示的title
    "component": "chartList", // 在导航栏对应的一个tabs中展示的组件，与publicUI下的组件对应
    "icon": "el-icon-bell", // 在左侧边栏导航栏中显示的title前的icon
    "items": [ // layout布局组件库类型下的组件库列表
      {
        "id": 2001,
        "label": "容器盒子",
        "type": "panel",
        "imgPath": "",
        "icon": "el-icon-box",
        "component": "designPanel", // 画布中实际渲染用到组件，与designUI下的组件对应
        "default": [   // 右侧边栏样式列表
          { 
            "id": "panel",
            "type": "configure",
            "icon": "",
            "component": "configureList",
            "label": "容器配置", // 右侧边栏导航栏中显示的title
            "configure": [
              {
                "label": "标题",
                "type": "title",
                "component": "configureInput", //右侧边栏样式属性对应的编辑组件，于configureUI下的组件对应
                "value": "容器标题" // 右侧边栏样式名称
              },
              {
                "label": "背景颜色",
                "component": "configureColor",
                "type": "backgroundColor",
                "value": "rgba(0, 0, 0, 0)",
                "predefineColors": [
                  "#00ced1",
                  "#1e90ff",
                  "#c71585",
                  "rgba(255, 69, 0, 0.68)",
                  "rgb(255, 120, 0)",
                  "hsv(51, 100, 98)"
                ]
              },
              {
                "label": "背景图片url",
                "type": "backgroundImage",
                "component": "configureInput",
                "value": ""
              },
              {
                "label": "背景透明度",
                "component": "configureInput",
                "type": "opacity",
                "value": "1"
              },
              {
                "label": "字体大小(px)",
                "component": "configureInput",
                "type": "fontSize",
                "value": "16"
              },
              {
                "label": "字体颜色",
                "component": "configureColor",
                "type": "color",
                "value": "#000000",
                "predefineColors": [
                  "#00ced1",
                  "#1e90ff",
                  "#c71585",
                  "rgba(255, 69, 0, 0.68)",
                  "rgb(255, 120, 0)",
                  "hsv(51, 100, 98)"
                ]
              }
            ]
          },
          {
            "id": "panel",
            "type": "dataFrom",
            "icon": "",
            "component": "dataFromList",
            "label": "数据源配置",
            "configure": []
          }
        ]
      },
      {
        "id": 2002,
        "label": "布局盒子",
        "type": "layout",
        "imgPath": "",
        "icon": "",
        "component": "designLayout",
        "default": [
          {
            "id": "layout",
            "type": "configure",
            "icon": "",
            "component": "configureList",
            "label": "布局配置",
            "configure": [
              {
                "label": "布局类型",
                "component": "configureLayoutConfig",
                "type": "item",
                "value": "scattered",
                "default": [
                  {
                    "label": "散布局",
                    "type": "scatteredLayout",
                    "value": "scattered"
                  },
                  {
                    "label": "左右布局",
                    "type": "leftAndRightLayout",
                    "value": "leftAndRight"
                  },
                  {
                    "label": "网格布局",
                    "type": "gridLayout",
                    "value": "grid"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": 2003,
        "label": "标题盒子",
        "type": "title",
        "imgPath": "https://img0.baidu.com/it/u=2102354730,4274661238&fm=253&fmt=auto&app=138&f=PNG?w=500&h=275",
        "icon": "",
        "component": "designTitle",
        "default": [
          {
            "id": "title",
            "type": "configure",
            "icon": "",
            "component": "configureList",
            "label": "标题配置",
            "configure": [
              {
                "label": "高度(%)",
                "type": "height",
                "component": "configureInput",
                "value": "10"
              },
              {
                "label": "标题",
                "type": "title",
                "component": "configureInput",
                "value": "容器标题"
              },
              {
                "label": "背景颜色",
                "component": "configureColor",
                "type": "backgroundColor",
                "value": "rgba(0, 0, 0, 0)",
                "predefineColors": [
                  "#00ced1",
                  "#1e90ff",
                  "#c71585",
                  "rgba(255, 69, 0, 0.68)",
                  "rgb(255, 120, 0)",
                  "hsv(51, 100, 98)"
                ]
              },
              {
                "label": "背景图片url",
                "type": "backgroundImage",
                "component": "configureInput",
                "value": ""
              },
              {
                "label": "背景透明度",
                "component": "configureInput",
                "type": "opacity",
                "value": "1"
              },
              {
                "label": "字体大小(px)",
                "component": "configureInput",
                "type": "fontSize",
                "value": "16"
              },
              {
                "label": "字体颜色",
                "component": "configureColor",
                "type": "color",
                "value": "#000000",
                "predefineColors": [
                  "#00ced1",
                  "#1e90ff",
                  "#c71585",
                  "rgba(255, 69, 0, 0.68)",
                  "rgb(255, 120, 0)",
                  "hsv(51, 100, 98)"
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "type": "eCharts",
    "label": "eCharts",
    "component": "chartList",
    "icon": "el-icon-menu",
    "items": [
      {
        "id": 1000,
        "label": "折线图",
        "type": "lineChart",
        "imgPath": "",
        "icon": "",
        "component": "designChart",
        "default": [
          {
            "id": "lineChart",
            "type": "configure",
            "icon": "",
            "component": "configureList",
            "label": "折线图配置",
            "configure": [
              {
                "label": "标题配置",
                "type": "title",
                "component": "configureChartList",
                "value": [
                  {
                    "label": "标题",
                    "type": "text", // eCharts的特有属性名称，需要与eCharts文档中对应的属性key值一致。
                    "component": "configureInput",
                    "value": "折线图标题"
                  },
                  {
                    "label": "显示",
                    "type": "show",
                    "component": "configureSwitch",
                    "value": true
                  },
                  {
                    "label": "标题超链接",
                    "type": "link",
                    "component": "configureInput",
                    "value": ""
                  },
                  {
                    "label": "标题样式",
                    "type": "textStyle",
                    "component": "configureChartList",
                    "value": [
                      {
                        "label": "字体颜色",
                        "component": "configureColor",
                        "type": "color",
                        "value": "#000000",
                        "predefineColors": [
                          "#00ced1",
                          "#1e90ff",
                          "#c71585",
                          "rgba(255, 69, 0, 0.68)",
                          "rgb(255, 120, 0)",
                          "hsv(51, 100, 98)"
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "id": "lineChart",
            "type": "position",
            "icon": "",
            "component": "configureList",
            "label": "定位配置",
            "configure": [
              {
                "label": "宽度(px)",
                "type": "width",
                "component": "configureInput",
                "value": 500
              },
              {
                "label": "高度(px)",
                "type": "height",
                "component": "configureInput",
                "value": 450
              },
              {
                "label": "top(px)",
                "type": "top",
                "component": "configureInput",
                "value": 0
              },
              {
                "label": "left(px)",
                "type": "left",
                "component": "configureInput",
                "value": 0
              }
            ]
          },
          {
            "id": "lineChart",
            "type": "dataFrom",
            "icon": "",
            "component": "dataFromList",
            "label": "数据源配置",
            "configure": [
              {
                "label": "数据源",
                "component": "configurDataSource",
                "type": "dataSource",
                "value": "staticData",
                "default": [
                  {
                    "label": "静态数据源",
                    "type": "staticData",
                    "url":"",
                    "value": {
                      "xAxis": {
                        "type": "category",
                        "data": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                      },
                      "yAxis": {
                        "type": "value"
                      },
                      "series": [
                        {
                          "data": [150, 230, 224, 218, 135, 147, 260],
                          "type": "line"
                        }
                      ]
                    }
                  },
                  {
                    "label": "动态数据源url",
                    "type": "dynamicDataUrl",
                    "url":"",
                    "value": ""
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "type": "decorate",
    "label": "装饰",
    "component": "chartList",
    "icon": "el-icon-s-open",
    "items": [
      {
        "id": 3000,
        "label": "修狗图片",
        "type": "img",
        "imgPath": "",
        "icon": "",
        "component": "designImg",
        "default": [
          {
            "id": "img",
            "type": "configure",
            "icon": "",
            "component": "configureList",
            "label": "图片配置",
            "configure": [
              {
                "label": "宽度(px)",
                "type": "width",
                "component": "configureInput",
                "value": 500
              },
              {
                "label": "高度(px)",
                "type": "height",
                "component": "configureInput",
                "value": 450
              }
            ]
          },
          {
            "id": "lineChart",
            "type": "dataFrom",
            "icon": "",
            "component": "dataFromList",
            "label": "数据源配置",
            "configure": [
              {
                "label": "图片url",
                "type": "src",
                "component": "configureInput",
                "value": "https://img1.baidu.com/it/u=1795611050,2013221134&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800"
              }
            ]
          }
        ]
      }
    ]
  }
]

```

## 三、设计思路

1. 整个画布的设计思想基于vue的component组件，从而实现组件间的层叠嵌套布局与渲染。
2. 初始化画布后，除开画布自身配置，需要使用布局组件库组件进行布局后，才允许插入普通组件。
3. 工作中的渲染树数据，存放于store的charts.js仓库中的canvasData中。
4. layout组件实现不同布局模式的思路，在于创建一个layout组件后，designUI - components - layoutBox.vue组件将会根据不同布局模式一个一个push入layout的children数组中

工作流程：

1. 左侧拖出一个组件，调用other/set_templateData向store/other.js中保存一份模板数据，用于在画布中创建视图
2. 组件放入画布或者某类布局组件中，对应容器组件识别拖拽API提供的组件类型（某个模板的json数据中对应组件的type），通过类型拷贝一份store/other.js/templateData中对应数据
3. 调用charts/add_canvasDataChild（添加画布亲子代组件）或charts/add_chart（添加组件）向当前工作中的渲染书对象，添加子孙组件
4. 向charts/configureList对象添加数据，configureList是右侧边栏样式修改的数据源，传入某个模板的json数据中对应的default数组
5. 修改右侧边栏某个样式的值，调用charts.js/modify_canvasDataChild -> findChildChart 找到目标组件在渲染树中的数据，并修改，组件监听到渲染树数据改变，更新视图

```javascript
this.modify_canvasDataChild({
    fatherId: this.propsData.fatherId,//用于区分父组件是否是画布，解决在修改画布亲代子组件的数据时出现找不到目标组件的问题
    id: this.propsData.id, // 当前组件的ID，用于找到渲染树中的组件数据
    data: {
        key: 'top', // 需要修改的数据的key
        value: "", // 需要修改的数据的value
    },
    type: 'position', // 区分是哪个配置项（position:模板json数据中控制宽高以及定位，其余还有configure样式配置，dataFrom数据源配置，具体请自行查看上方的二中的数据结构）
})
```

​	6. 当拖动组件或缩放组件时，由于右侧边栏修改数据是单向的，因此需用到other/inputValue数据实时更新右侧边栏视图