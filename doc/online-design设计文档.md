# online-design 设计文档

## 一、目录结构

├── src

│ ├── api # 所有请求

│ ├── assets

│ ├── components

- configureUI 右侧边栏各个样式对应的编辑组件库

- designUI 左侧边栏各个模板对应的组件库

- publicUI 一些公共组件库，例如右侧边栏内部的导航栏以及 tabs 组件，
- functionality 内存放一些功能组件，例如自定义的鼠标右击事件弹出的菜单栏

│ ├── mixins #控制一些全局样式的混入

│ ├── mock #mock

│ ├── router # 路由

│ ├── store

- charts.js 存储组件左侧边栏模板数据仓库，以及画布数据
- app.js 全局样式控制仓库
- other.js 一些额外的配置仓库，具体看注释信息

│ ├── styles # 全局样式

│ ├── utils # 全局公用方法

- expirationTime.js 控制一些数据的持久化时间
- blackList.js 限制组件模板间嵌套的黑名单
- request.js axios 封装

│ ├── views # views 所有页面

│ ├── App.vue # 入口页面

│ ├── main.js # 入口文件 加载组件 初始化等

│ ├── defaultSettings # 一些初始化时的默认配置，如 vue-ls 的基本配置项

│ └── permission.js # 权限管理（未实现，现仅做路由跳转时跳转进度条）

## 三、数据结构

> 注意 eCharts 的数据结构有所不同

```json
[
  {
    "id": 1,
    "label": "布局",
    "type": "layout",
    "icon": "el-icon-bell",
    "component": "chartList",
    "created_at": "2023-04-03T07:39:59.000Z",
    "updated_at": "2023-05-11T00:45:47.000Z",
    "items": [
      {
        "id": 1,
        "label": "容器盒子",
        "type": "panel",
        "imgPath": null,
        "icon": "el-icon-box",
        "component": "designPanel",
        "template_id": 1,
        "created_at": "2023-04-03T07:42:51.000Z",
        "updated_at": "2023-04-03T07:42:53.000Z",
        "default": [
          {
            "id": 1,
            "label": "容器配置",
            "type": "configure",
            "icon": null,
            "component": "configureList",
            "components_id": 1,
            "created_at": "2023-04-03T07:49:55.000Z",
            "updated_at": "2023-04-03T07:49:57.000Z",
            "configure": [
              {
                "id": 1,
                "label": "标题",
                "type": "title",
                "component": "configureInput",
                "value": "容器标题",
                "disabled": null,
                "jsonData": null,
                "defaults_id": 1,
                "created_at": "2023-04-03T08:03:36.000Z",
                "updated_at": "2023-04-03T08:03:38.000Z",
                "values": [],
                "default": []
              },
              {
                "id": 2,
                "label": "背景图片url",
                "type": "backgroundImage",
                "component": "configureInput",
                "value": null,
                "disabled": null,
                "jsonData": null,
                "defaults_id": 1,
                "created_at": "2023-04-03T08:14:03.000Z",
                "updated_at": "2023-04-03T08:14:06.000Z",
                "values": [],
                "default": []
              },
              {
                "id": 3,
                "label": "背景颜色",
                "type": "backgroundColor",
                "component": "configureColor",
                "value": "rgba(0, 0, 0, 0)",
                "disabled": null,
                "jsonData": [
                  "#00ced1",
                  "#1e90ff",
                  "#c71585",
                  "rgba(255, 69, 0, 0.68)",
                  "rgb(255, 120, 0)",
                  "hsv(51, 100, 98)"
                ],
                "defaults_id": 1,
                "created_at": "2023-04-03T08:15:03.000Z",
                "updated_at": "2023-05-12T01:56:23.000Z",
                "values": [],
                "default": []
              },
              {
                "id": 4,
                "label": "背景透明度",
                "type": "opacity",
                "component": "configureInput",
                "value": "1",
                "disabled": null,
                "jsonData": null,
                "defaults_id": 1,
                "created_at": "2023-04-03T08:15:51.000Z",
                "updated_at": "2023-04-03T08:15:53.000Z",
                "values": [],
                "default": []
              },
              {
                "id": 5,
                "label": "字体大小(px)",
                "type": "fontSize",
                "component": "configureInput",
                "value": "16",
                "disabled": null,
                "jsonData": null,
                "defaults_id": 1,
                "created_at": "2023-04-03T08:16:42.000Z",
                "updated_at": "2023-04-03T08:16:45.000Z",
                "values": [],
                "default": []
              },
              {
                "id": 6,
                "label": "字体颜色",
                "type": "color",
                "component": "configureColor",
                "value": "#000000",
                "disabled": null,
                "jsonData": [
                  "#00ced1",
                  "#1e90ff",
                  "#c71585",
                  "rgba(255, 69, 0, 0.68)",
                  "rgb(255, 120, 0)",
                  "hsv(51, 100, 98)"
                ],
                "defaults_id": 1,
                "created_at": "2023-04-03T08:17:17.000Z",
                "updated_at": "2023-04-03T08:17:19.000Z",
                "values": [],
                "default": []
              }
            ]
          },
          {
            "id": 2,
            "label": "数据源配置",
            "type": "dataFrom",
            "icon": null,
            "component": "dataFromPanelList",
            "components_id": 1,
            "created_at": "2023-04-03T07:52:12.000Z",
            "updated_at": "2023-04-03T07:52:14.000Z",
            "configure": []
          }
        ]
      },
      {
        "id": 2,
        "label": "布局盒子",
        "type": "layout",
        "imgPath": null,
        "icon": null,
        "component": "designLayout",
        "template_id": 1,
        "created_at": "2023-04-03T07:43:50.000Z",
        "updated_at": "2023-04-03T07:43:52.000Z",
        "default": [
          {
            "id": 3,
            "label": "布局配置",
            "type": "configure",
            "icon": null,
            "component": "configureList",
            "components_id": 2,
            "created_at": "2023-04-03T07:52:47.000Z",
            "updated_at": "2023-04-03T07:52:49.000Z",
            "configure": [
              {
                "id": 7,
                "label": "布局类型",
                "type": "item",
                "component": "configureLayoutConfig",
                "value": "scattered",
                "disabled": null,
                "jsonData": null,
                "defaults_id": 3,
                "created_at": "2023-04-03T08:21:39.000Z",
                "updated_at": "2023-04-03T08:21:41.000Z",
                "values": [],
                "default": [
                  {
                    "id": 3,
                    "label": "网格布局",
                    "type": "gridLayout",
                    "value": "grid",
                    "configures_id": 7,
                    "created_at": "2023-04-03T08:25:47.000Z",
                    "updated_at": "2023-04-03T08:25:50.000Z"
                  },
                  {
                    "id": 2,
                    "label": "左右布局",
                    "type": "leftAndRightLayout",
                    "value": "leftAndRight",
                    "configures_id": 7,
                    "created_at": "2023-04-03T08:25:07.000Z",
                    "updated_at": "2023-04-03T08:25:08.000Z"
                  },
                  {
                    "id": 1,
                    "label": "无布局",
                    "type": "scatteredLayout",
                    "value": "scattered",
                    "configures_id": 7,
                    "created_at": "2023-04-03T08:24:04.000Z",
                    "updated_at": "2023-04-03T08:24:07.000Z"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": 3,
        "label": "标题盒子",
        "type": "title",
        "imgPath": "https://img0.baidu.com/it/u=2102354730,4274661238&fm=253&fmt=auto&app=138&f=PNG?w=500&h=275",
        "icon": null,
        "component": "designTitle",
        "template_id": 1,
        "created_at": "2023-04-03T07:47:01.000Z",
        "updated_at": "2023-04-03T07:47:03.000Z",
        "default": [
          {
            "id": 4,
            "label": "标题配置",
            "type": "configure",
            "icon": null,
            "component": "configureList",
            "components_id": 3,
            "created_at": "2023-04-03T07:53:28.000Z",
            "updated_at": "2023-04-03T07:53:30.000Z",
            "configure": [
              {
                "id": 8,
                "label": "高度(%)",
                "type": "height",
                "component": "configureInput",
                "value": "10",
                "disabled": null,
                "jsonData": null,
                "defaults_id": 4,
                "created_at": "2023-04-03T08:23:39.000Z",
                "updated_at": "2023-04-03T08:23:42.000Z",
                "values": [],
                "default": []
              },
              {
                "id": 9,
                "label": "标题",
                "type": "title",
                "component": "configureInput",
                "value": "容器标题",
                "disabled": null,
                "jsonData": null,
                "defaults_id": 4,
                "created_at": "2023-04-03T08:26:58.000Z",
                "updated_at": "2023-04-03T08:27:01.000Z",
                "values": [],
                "default": []
              },
              {
                "id": 10,
                "label": "背景颜色",
                "type": "backgroundColor",
                "component": "configureColor",
                "value": "rgba(0, 0, 0, 0)",
                "disabled": null,
                "jsonData": [
                  "#00ced1",
                  "#1e90ff",
                  "#c71585",
                  "rgba(255, 69, 0, 0.68)",
                  "rgb(255, 120, 0)",
                  "hsv(51, 100, 98)"
                ],
                "defaults_id": 4,
                "created_at": "2023-04-03T08:27:33.000Z",
                "updated_at": "2023-04-03T08:27:36.000Z",
                "values": [],
                "default": []
              },
              {
                "id": 11,
                "label": "背景图片url",
                "type": "backgroundImage",
                "component": "configureInput",
                "value": null,
                "disabled": null,
                "jsonData": null,
                "defaults_id": 4,
                "created_at": "2023-04-03T08:28:15.000Z",
                "updated_at": "2023-04-03T08:28:18.000Z",
                "values": [],
                "default": []
              },
              {
                "id": 12,
                "label": "背景透明度",
                "type": "opacity",
                "component": "configureInput",
                "value": "1",
                "disabled": null,
                "jsonData": null,
                "defaults_id": 4,
                "created_at": "2023-04-03T08:28:48.000Z",
                "updated_at": "2023-04-03T08:28:50.000Z",
                "values": [],
                "default": []
              },
              {
                "id": 13,
                "label": "字体大小(px)",
                "type": "fontSize",
                "component": "configureInput",
                "value": "16",
                "disabled": null,
                "jsonData": null,
                "defaults_id": 4,
                "created_at": "2023-04-03T08:29:18.000Z",
                "updated_at": "2023-04-03T08:29:20.000Z",
                "values": [],
                "default": []
              },
              {
                "id": 14,
                "label": "字体颜色",
                "type": "color",
                "component": "configureColor",
                "value": "#000000",
                "disabled": null,
                "jsonData": [
                  "#00ced1",
                  "#1e90ff",
                  "#c71585",
                  "rgba(255, 69, 0, 0.68)",
                  "rgb(255, 120, 0)",
                  "hsv(51, 100, 98)"
                ],
                "defaults_id": 4,
                "created_at": "2023-04-03T08:29:56.000Z",
                "updated_at": "2023-04-03T08:29:58.000Z",
                "values": [],
                "default": []
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 2,
    "label": "eCharts",
    "type": "eCharts",
    "icon": "el-icon-menu",
    "component": "chartList",
    "created_at": "2023-04-03T07:40:53.000Z",
    "updated_at": "2023-05-12T04:30:58.000Z",
    "items": [
      {
        "id": 4,
        "label": "折线图",
        "type": "lineChart",
        "imgPath": null,
        "icon": null,
        "component": "designChart",
        "template_id": 2,
        "created_at": "2023-04-03T07:47:39.000Z",
        "updated_at": "2023-04-03T07:47:41.000Z",
        "default": [
          {
            "id": 5,
            "label": "折线图配置",
            "type": "configure",
            "icon": null,
            "component": "configureList",
            "components_id": 4,
            "created_at": "2023-04-03T07:56:27.000Z",
            "updated_at": "2023-04-03T07:56:29.000Z",
            "configure": [
              {
                "id": 15,
                "label": "标题配置",
                "type": "title",
                "component": "configureChartList",
                "value": null,
                "disabled": null,
                "jsonData": null,
                "defaults_id": 5,
                "created_at": "2023-04-03T08:31:10.000Z",
                "updated_at": "2023-05-12T05:31:04.000Z",
                "values": [
                  {
                    "id": 1,
                    "label": "标题",
                    "type": "text",
                    "component": "configureInput",
                    "value": "折线图标题23",
                    "jsonData": null,
                    "configures_id": 15,
                    "created_at": "2023-04-03T08:35:35.000Z",
                    "updated_at": "2023-05-12T05:31:04.000Z",
                    "values": []
                  },
                  {
                    "id": 2,
                    "label": "显示",
                    "type": "show",
                    "component": "configureSwitch",
                    "value": "0",
                    "jsonData": null,
                    "configures_id": 15,
                    "created_at": "2023-04-03T08:37:35.000Z",
                    "updated_at": "2023-05-12T05:31:04.000Z",
                    "values": []
                  },
                  {
                    "id": 3,
                    "label": "标题超链接",
                    "type": "link",
                    "component": "configureInput",
                    "value": null,
                    "jsonData": null,
                    "configures_id": 15,
                    "created_at": "2023-04-03T08:40:58.000Z",
                    "updated_at": "2023-05-12T05:31:04.000Z",
                    "values": []
                  },
                  {
                    "id": 4,
                    "label": "标题样式",
                    "type": "textStyle",
                    "component": "configureChartList",
                    "value": null,
                    "jsonData": null,
                    "configures_id": 15,
                    "created_at": "2023-04-03T08:41:23.000Z",
                    "updated_at": "2023-05-12T05:31:04.000Z",
                    "values": [
                      {
                        "id": 1,
                        "label": "字体颜色",
                        "type": "color",
                        "value": "#000000",
                        "component": "configureColor",
                        "jsonData": [
                          "#00ced1",
                          "#1e90ff",
                          "#c71585",
                          "rgba(255, 69, 0, 0.68)",
                          "rgb(255, 120, 0)",
                          "hsv(51, 100, 98)"
                        ],
                        "created_at": "2023-04-04T23:42:50.000Z",
                        "updated_at": "2023-05-12T05:31:04.000Z",
                        "value_id": 4
                      },
                      {
                        "id": 4,
                        "label": "字体样式",
                        "type": "fontStyle",
                        "value": "normal",
                        "component": "configureInput",
                        "jsonData": null,
                        "created_at": "2023-05-11T03:51:59.000Z",
                        "updated_at": "2023-05-12T05:31:04.000Z",
                        "value_id": 4
                      },
                      {
                        "id": 5,
                        "label": "字体宽度",
                        "type": "fontWeight",
                        "value": "bolder",
                        "component": "configureInput",
                        "jsonData": null,
                        "created_at": "2023-05-12T02:20:35.000Z",
                        "updated_at": "2023-05-12T05:31:04.000Z",
                        "value_id": 4
                      },
                      {
                        "id": 6,
                        "label": "字体大小",
                        "type": "fontSize",
                        "value": "18",
                        "component": "configureInput",
                        "jsonData": null,
                        "created_at": "2023-05-12T02:20:35.000Z",
                        "updated_at": "2023-05-12T05:31:04.000Z",
                        "value_id": 4
                      },
                      {
                        "id": 7,
                        "label": "字体描边颜色",
                        "type": "textBorderColor",
                        "value": "#000000",
                        "component": "configureColor",
                        "jsonData": [
                          "#00ced1",
                          "#1e90ff",
                          "#c71585",
                          "rgba(255, 69, 0, 0.68)",
                          "rgb(255, 120, 0)",
                          "hsv(51, 100, 98)"
                        ],
                        "created_at": "2023-05-12T02:20:35.000Z",
                        "updated_at": "2023-05-12T05:31:04.000Z",
                        "value_id": 4
                      },
                      {
                        "id": 8,
                        "label": "字体描边宽度",
                        "type": "textBorderWidth",
                        "value": "0",
                        "component": "configureInput",
                        "jsonData": null,
                        "created_at": "2023-05-12T02:20:35.000Z",
                        "updated_at": "2023-05-12T05:31:04.000Z",
                        "value_id": 4
                      },
                      {
                        "id": 9,
                        "label": "字体阴影",
                        "type": "textShadowColor",
                        "value": "transparent",
                        "component": "configureColor",
                        "jsonData": [
                          "#00ced1",
                          "#1e90ff",
                          "#c71585",
                          "rgba(255, 69, 0, 0.68)",
                          "rgb(255, 120, 0)",
                          "hsv(51, 100, 98)"
                        ],
                        "created_at": "2023-05-12T02:20:35.000Z",
                        "updated_at": "2023-05-12T05:31:04.000Z",
                        "value_id": 4
                      },
                      {
                        "id": 10,
                        "label": "字体阴影长度",
                        "type": "textShadowBlur",
                        "value": "0",
                        "component": "configureInput",
                        "jsonData": null,
                        "created_at": "2023-05-12T02:20:35.000Z",
                        "updated_at": "2023-05-12T05:31:04.000Z",
                        "value_id": 4
                      },
                      {
                        "id": 11,
                        "label": "字体阴影X偏移",
                        "type": "textShadowOffsetX",
                        "value": "0",
                        "component": "configureInput",
                        "jsonData": null,
                        "created_at": "2023-05-12T02:20:35.000Z",
                        "updated_at": "2023-05-12T05:31:04.000Z",
                        "value_id": 4
                      },
                      {
                        "id": 12,
                        "label": "字体阴影Y偏移",
                        "type": "textShadowOffsetY",
                        "value": "0",
                        "component": "configureInput",
                        "jsonData": null,
                        "created_at": "2023-05-12T02:20:35.000Z",
                        "updated_at": "2023-05-12T05:31:04.000Z",
                        "value_id": 4
                      }
                    ]
                  }
                ],
                "default": []
              }
            ]
          },
          {
            "id": 6,
            "label": "定位配置",
            "type": "position",
            "icon": null,
            "component": "configureList",
            "components_id": 4,
            "created_at": "2023-04-03T07:57:13.000Z",
            "updated_at": "2023-04-03T07:57:15.000Z",
            "configure": [
              {
                "id": 16,
                "label": "宽度(px)",
                "type": "width",
                "component": "configureInput",
                "value": "500",
                "disabled": "0",
                "jsonData": null,
                "defaults_id": 6,
                "created_at": "2023-04-03T08:59:59.000Z",
                "updated_at": "2023-04-03T09:00:01.000Z",
                "values": [],
                "default": []
              },
              {
                "id": 17,
                "label": "高度(px)",
                "type": "height",
                "component": "configureInput",
                "value": "450",
                "disabled": "0",
                "jsonData": null,
                "defaults_id": 6,
                "created_at": "2023-04-03T09:09:04.000Z",
                "updated_at": "2023-04-03T09:09:06.000Z",
                "values": [],
                "default": []
              },
              {
                "id": 18,
                "label": "top(px)",
                "type": "top",
                "component": "configureInput",
                "value": "0",
                "disabled": "0",
                "jsonData": null,
                "defaults_id": 6,
                "created_at": "2023-04-03T09:09:43.000Z",
                "updated_at": "2023-04-03T09:09:45.000Z",
                "values": [],
                "default": []
              },
              {
                "id": 19,
                "label": "left(px)",
                "type": "left",
                "component": "configureInput",
                "value": "0",
                "disabled": "0",
                "jsonData": null,
                "defaults_id": 6,
                "created_at": "2023-04-03T09:10:28.000Z",
                "updated_at": "2023-04-03T09:10:31.000Z",
                "values": [],
                "default": []
              }
            ]
          },
          {
            "id": 7,
            "label": "数据源配置",
            "type": "dataFrom",
            "icon": null,
            "component": "dataFromList",
            "components_id": 4,
            "created_at": "2023-04-03T07:58:12.000Z",
            "updated_at": "2023-04-03T07:58:16.000Z",
            "configure": [
              {
                "id": 20,
                "label": "静态数据源",
                "type": "staticData",
                "component": null,
                "value": "",
                "disabled": null,
                "jsonData": {
                  "xAxis": {
                    "data": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    "type": "category"
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
                },
                "defaults_id": 7,
                "created_at": "2023-04-03T09:11:42.000Z",
                "updated_at": "2023-04-03T09:11:45.000Z",
                "values": [],
                "default": []
              },
              {
                "id": 21,
                "label": "动态数据源url",
                "type": "dynamicDataUrl",
                "component": null,
                "value": null,
                "disabled": null,
                "jsonData": null,
                "defaults_id": 7,
                "created_at": "2023-04-03T09:25:26.000Z",
                "updated_at": "2023-04-03T09:25:29.000Z",
                "values": [],
                "default": []
              }
            ]
          }
        ]
      },
      {
        "id": 1683863912179,
        "label": "饼图",
        "type": "pieChart",
        "imgPath": "",
        "icon": "",
        "component": "designChart",
        "template_id": 2,
        "created_at": "2023-05-12T04:13:53.000Z",
        "updated_at": "2023-05-12T04:13:53.000Z",
        "default": [
          {
            "id": 1683863925401,
            "label": "定位配置",
            "type": "position",
            "icon": "",
            "component": "configureList",
            "components_id": 1683863912179,
            "created_at": "2023-05-12T04:13:53.000Z",
            "updated_at": "2023-05-12T04:13:53.000Z",
            "configure": [
              {
                "id": 27,
                "label": "宽度(px)",
                "type": "width",
                "component": "configureInput",
                "value": "500",
                "disabled": "0",
                "jsonData": null,
                "defaults_id": 1683863925401,
                "created_at": "2023-05-12T04:13:53.000Z",
                "updated_at": "2023-05-12T04:13:53.000Z",
                "values": [],
                "default": []
              },
              {
                "id": 28,
                "label": "高度(px)",
                "type": "height",
                "component": "configureInput",
                "value": "450",
                "disabled": "0",
                "jsonData": null,
                "defaults_id": 1683863925401,
                "created_at": "2023-05-12T04:13:53.000Z",
                "updated_at": "2023-05-12T04:13:53.000Z",
                "values": [],
                "default": []
              },
              {
                "id": 29,
                "label": "top(px)",
                "type": "top",
                "component": "configureInput",
                "value": "0",
                "disabled": "0",
                "jsonData": null,
                "defaults_id": 1683863925401,
                "created_at": "2023-05-12T04:13:53.000Z",
                "updated_at": "2023-05-12T04:13:53.000Z",
                "values": [],
                "default": []
              },
              {
                "id": 30,
                "label": "left(px)",
                "type": "left",
                "component": "configureInput",
                "value": "0",
                "disabled": "0",
                "jsonData": null,
                "defaults_id": 1683863925401,
                "created_at": "2023-05-12T04:13:53.000Z",
                "updated_at": "2023-05-12T04:13:53.000Z",
                "values": [],
                "default": []
              }
            ]
          },
          {
            "id": 1683865616183,
            "label": "数据源配置",
            "type": "dataFrom",
            "icon": "",
            "component": "dataFromList",
            "components_id": 1683863912179,
            "created_at": "2023-05-12T04:28:18.000Z",
            "updated_at": "2023-05-12T04:28:18.000Z",
            "configure": [
              {
                "id": 1683865690986,
                "label": "静态数据源",
                "type": "staticData",
                "component": "",
                "value": "",
                "disabled": "0",
                "jsonData": {
                  "title": {
                    "left": "center",
                    "text": "Referer of a Website",
                    "subtext": "Fake Data"
                  },
                  "legend": {
                    "left": "left",
                    "orient": "vertical"
                  },
                  "series": [
                    {
                      "data": [
                        {
                          "name": "Search Engine",
                          "value": 1048
                        },
                        {
                          "name": "Direct",
                          "value": 735
                        },
                        {
                          "name": "Email",
                          "value": 580
                        },
                        {
                          "name": "Union Ads",
                          "value": 484
                        },
                        {
                          "name": "Video Ads",
                          "value": 300
                        }
                      ],
                      "name": "Access From",
                      "type": "pie",
                      "radius": "50%",
                      "emphasis": {
                        "itemStyle": {
                          "shadowBlur": 10,
                          "shadowColor": "rgba(0,0,0,0.5)",
                          "shadowOffsetX": 0
                        }
                      }
                    }
                  ],
                  "tooltip": {
                    "trigger": "item"
                  }
                },
                "defaults_id": 1683865616183,
                "created_at": "2023-05-12T04:28:18.000Z",
                "updated_at": "2023-05-12T05:31:04.000Z",
                "values": [],
                "default": []
              }
            ]
          },
          {
            "id": 1683867928951,
            "label": "饼图配置",
            "type": "configure",
            "icon": "",
            "component": "configureList",
            "components_id": 1683863912179,
            "created_at": "2023-05-12T05:09:05.000Z",
            "updated_at": "2023-05-12T05:09:05.000Z",
            "configure": [
              {
                "id": 1683867964878,
                "label": "标题配置",
                "type": "title",
                "component": "configureChartList",
                "value": "",
                "disabled": "0",
                "jsonData": "",
                "defaults_id": 1683867928951,
                "created_at": "2023-05-12T05:09:05.000Z",
                "updated_at": "2023-05-15T03:26:11.000Z",
                "values": [
                  {
                    "id": 5,
                    "label": "标题样式",
                    "type": "textStyle",
                    "component": "configureChartList",
                    "value": null,
                    "jsonData": null,
                    "configures_id": 1683867964878,
                    "created_at": "2023-04-03T08:41:23.000Z",
                    "updated_at": "2023-05-15T04:42:26.000Z",
                    "values": [
                      {
                        "id": 25,
                        "label": "字体阴影Y偏移",
                        "type": "textShadowOffsetY",
                        "value": "0",
                        "component": "configureInput",
                        "jsonData": null,
                        "created_at": "2023-05-12T05:36:26.000Z",
                        "updated_at": "2023-05-15T04:42:26.000Z",
                        "value_id": 5
                      },
                      {
                        "id": 26,
                        "label": "字体阴影X偏移",
                        "type": "textShadowOffsetX",
                        "value": "0",
                        "component": "configureInput",
                        "jsonData": null,
                        "created_at": "2023-05-12T05:36:26.000Z",
                        "updated_at": "2023-05-15T04:42:26.000Z",
                        "value_id": 5
                      },
                      {
                        "id": 27,
                        "label": "字体阴影长度",
                        "type": "textShadowBlur",
                        "value": "0",
                        "component": "configureInput",
                        "jsonData": null,
                        "created_at": "2023-05-12T05:36:26.000Z",
                        "updated_at": "2023-05-15T04:42:26.000Z",
                        "value_id": 5
                      },
                      {
                        "id": 28,
                        "label": "字体阴影",
                        "type": "textShadowColor",
                        "value": "transparent",
                        "component": "configureColor",
                        "jsonData": [
                          "#00ced1",
                          "#1e90ff",
                          "#c71585",
                          "rgba(255, 69, 0, 0.68)",
                          "rgb(255, 120, 0)",
                          "hsv(51, 100, 98)"
                        ],
                        "created_at": "2023-05-12T05:36:26.000Z",
                        "updated_at": "2023-05-15T04:42:26.000Z",
                        "value_id": 5
                      },
                      {
                        "id": 29,
                        "label": "字体描边颜色",
                        "type": "textBorderColor",
                        "value": "#000000",
                        "component": "configureColor",
                        "jsonData": [
                          "#00ced1",
                          "#1e90ff",
                          "#c71585",
                          "rgba(255, 69, 0, 0.68)",
                          "rgb(255, 120, 0)",
                          "hsv(51, 100, 98)"
                        ],
                        "created_at": "2023-05-12T05:36:26.000Z",
                        "updated_at": "2023-05-15T04:42:26.000Z",
                        "value_id": 5
                      },
                      {
                        "id": 30,
                        "label": "字体大小",
                        "type": "fontSize",
                        "value": "18",
                        "component": "configureInput",
                        "jsonData": null,
                        "created_at": "2023-05-12T05:36:26.000Z",
                        "updated_at": "2023-05-15T04:42:26.000Z",
                        "value_id": 5
                      },
                      {
                        "id": 31,
                        "label": "字体宽度",
                        "type": "fontWeight",
                        "value": "bolder",
                        "component": "configureSelect",
                        "jsonData": [
                          "normal",
                          "bold",
                          "bolder",
                          "lighter",
                          100,
                          200,
                          300,
                          400,
                          500,
                          600,
                          700,
                          800,
                          900
                        ],
                        "created_at": "2023-05-12T05:36:26.000Z",
                        "updated_at": "2023-05-15T04:42:26.000Z",
                        "value_id": 5
                      },
                      {
                        "id": 32,
                        "label": "字体样式",
                        "type": "fontStyle",
                        "value": "normal",
                        "component": "configureSelect",
                        "jsonData": ["normal", "italic", "oblique"],
                        "created_at": "2023-05-12T05:36:26.000Z",
                        "updated_at": "2023-05-15T04:42:26.000Z",
                        "value_id": 5
                      },
                      {
                        "id": 33,
                        "label": "字体颜色",
                        "type": "color",
                        "value": "#000000",
                        "component": "configureColor",
                        "jsonData": [
                          "#00ced1",
                          "#1e90ff",
                          "#c71585",
                          "rgba(255, 69, 0, 0.68)",
                          "rgb(255, 120, 0)",
                          "hsv(51, 100, 98)"
                        ],
                        "created_at": "2023-05-12T05:36:26.000Z",
                        "updated_at": "2023-05-15T04:42:26.000Z",
                        "value_id": 5
                      }
                    ]
                  },
                  {
                    "id": 6,
                    "label": "标题超链接",
                    "type": "link",
                    "component": "configureInput",
                    "value": null,
                    "jsonData": null,
                    "configures_id": 1683867964878,
                    "created_at": "2023-04-03T08:40:58.000Z",
                    "updated_at": "2023-05-15T04:42:26.000Z",
                    "values": []
                  },
                  {
                    "id": 7,
                    "label": "显示",
                    "type": "show",
                    "component": "configureSwitch",
                    "value": "1",
                    "jsonData": null,
                    "configures_id": 1683867964878,
                    "created_at": "2023-04-03T08:37:35.000Z",
                    "updated_at": "2023-05-15T04:42:26.000Z",
                    "values": []
                  },
                  {
                    "id": 8,
                    "label": "标题",
                    "type": "text",
                    "component": "configureInput",
                    "value": "饼图标题qwe",
                    "jsonData": null,
                    "configures_id": 1683867964878,
                    "created_at": "2023-04-03T08:35:35.000Z",
                    "updated_at": "2023-05-15T04:42:26.000Z",
                    "values": []
                  },
                  {
                    "id": 9,
                    "label": "副标题",
                    "type": "subtext",
                    "component": "configureInput",
                    "value": "饼图副标题",
                    "jsonData": null,
                    "configures_id": 1683867964878,
                    "created_at": "2023-05-15T02:33:28.000Z",
                    "updated_at": "2023-05-15T04:42:26.000Z",
                    "values": []
                  },
                  {
                    "id": 10,
                    "label": "副标题文本超链接",
                    "type": "sublink",
                    "component": "configureInput",
                    "value": "饼图副标题",
                    "jsonData": null,
                    "configures_id": 1683867964878,
                    "created_at": "2023-05-15T02:33:28.000Z",
                    "updated_at": "2023-05-15T04:42:26.000Z",
                    "values": []
                  },
                  {
                    "id": 11,
                    "label": "指定窗口打开",
                    "type": "subtarget",
                    "component": "configureSelect",
                    "value": "self",
                    "jsonData": ["self", "blank"],
                    "configures_id": 1683867964878,
                    "created_at": "2023-05-15T02:33:28.000Z",
                    "updated_at": "2023-05-15T04:42:26.000Z",
                    "values": []
                  },
                  {
                    "id": 12,
                    "label": "副标题样式",
                    "type": "subtextStyle",
                    "component": "configureChartList",
                    "value": null,
                    "jsonData": null,
                    "configures_id": 1683867964878,
                    "created_at": "2023-05-15T02:33:28.000Z",
                    "updated_at": "2023-05-15T04:42:26.000Z",
                    "values": [
                      {
                        "id": 34,
                        "label": "字体阴影Y偏移",
                        "type": "textShadowOffsetY",
                        "value": "0",
                        "component": "configureInput",
                        "jsonData": null,
                        "created_at": "2023-05-15T02:39:36.000Z",
                        "updated_at": "2023-05-15T04:42:26.000Z",
                        "value_id": 12
                      },
                      {
                        "id": 35,
                        "label": "字体阴影X偏移",
                        "type": "textShadowOffsetX",
                        "value": "0",
                        "component": "configureInput",
                        "jsonData": null,
                        "created_at": "2023-05-15T02:39:36.000Z",
                        "updated_at": "2023-05-15T04:42:26.000Z",
                        "value_id": 12
                      },
                      {
                        "id": 36,
                        "label": "字体阴影长度",
                        "type": "textShadowBlur",
                        "value": "0",
                        "component": "configureInput",
                        "jsonData": null,
                        "created_at": "2023-05-15T02:39:36.000Z",
                        "updated_at": "2023-05-15T04:42:26.000Z",
                        "value_id": 12
                      },
                      {
                        "id": 37,
                        "label": "字体阴影",
                        "type": "textShadowColor",
                        "value": "transparent",
                        "component": "configureColor",
                        "jsonData": [
                          "#00ced1",
                          "#1e90ff",
                          "#c71585",
                          "rgba(255, 69, 0, 0.68)",
                          "rgb(255, 120, 0)",
                          "hsv(51, 100, 98)"
                        ],
                        "created_at": "2023-05-15T02:39:36.000Z",
                        "updated_at": "2023-05-15T04:42:26.000Z",
                        "value_id": 12
                      },
                      {
                        "id": 38,
                        "label": "字体描边颜色",
                        "type": "textBorderColor",
                        "value": "#000000",
                        "component": "configureColor",
                        "jsonData": [
                          "#00ced1",
                          "#1e90ff",
                          "#c71585",
                          "rgba(255, 69, 0, 0.68)",
                          "rgb(255, 120, 0)",
                          "hsv(51, 100, 98)"
                        ],
                        "created_at": "2023-05-15T02:39:36.000Z",
                        "updated_at": "2023-05-15T04:42:26.000Z",
                        "value_id": 12
                      },
                      {
                        "id": 39,
                        "label": "字体大小",
                        "type": "fontSize",
                        "value": "18",
                        "component": "configureInput",
                        "jsonData": null,
                        "created_at": "2023-05-15T02:39:36.000Z",
                        "updated_at": "2023-05-15T04:42:26.000Z",
                        "value_id": 12
                      },
                      {
                        "id": 40,
                        "label": "字体宽度",
                        "type": "fontWeight",
                        "value": "bolder",
                        "component": "configureSelect",
                        "jsonData": [
                          "normal",
                          "bold",
                          "bolder",
                          "lighter",
                          100,
                          200,
                          300,
                          400,
                          500,
                          600,
                          700,
                          800,
                          900
                        ],
                        "created_at": "2023-05-15T02:39:36.000Z",
                        "updated_at": "2023-05-15T04:42:26.000Z",
                        "value_id": 12
                      },
                      {
                        "id": 41,
                        "label": "字体样式",
                        "type": "fontStyle",
                        "value": "normal",
                        "component": "configureSelect",
                        "jsonData": ["normal", "italic", "oblique"],
                        "created_at": "2023-05-15T02:39:36.000Z",
                        "updated_at": "2023-05-15T04:42:26.000Z",
                        "value_id": 12
                      },
                      {
                        "id": 42,
                        "label": "字体颜色",
                        "type": "color",
                        "value": "#000000",
                        "component": "configureColor",
                        "jsonData": [
                          "#00ced1",
                          "#1e90ff",
                          "#c71585",
                          "rgba(255, 69, 0, 0.68)",
                          "rgb(255, 120, 0)",
                          "hsv(51, 100, 98)"
                        ],
                        "created_at": "2023-05-15T02:39:36.000Z",
                        "updated_at": "2023-05-15T04:42:26.000Z",
                        "value_id": 12
                      }
                    ]
                  },
                  {
                    "id": 17,
                    "label": "整体水平对齐方式",
                    "type": "textAlign",
                    "component": "configureSelect",
                    "value": null,
                    "jsonData": ["auto", "left", "right", "center"],
                    "configures_id": 1683867964878,
                    "created_at": "2023-05-15T02:54:05.000Z",
                    "updated_at": "2023-05-15T04:42:26.000Z",
                    "values": []
                  },
                  {
                    "id": 35,
                    "label": "左距离",
                    "type": "left",
                    "component": "configureSelect",
                    "value": "center",
                    "jsonData": ["left", "center", "right"],
                    "configures_id": 1683867964878,
                    "created_at": "2023-05-15T03:03:18.000Z",
                    "updated_at": "2023-05-15T04:42:26.000Z",
                    "values": []
                  },
                  {
                    "id": 36,
                    "label": "顶部距离",
                    "type": "top",
                    "component": "configureSelect",
                    "value": "top",
                    "jsonData": ["top", "middle", "bottom"],
                    "configures_id": 1683867964878,
                    "created_at": "2023-05-15T03:03:18.000Z",
                    "updated_at": "2023-05-15T04:42:26.000Z",
                    "values": []
                  },
                  {
                    "id": 58,
                    "label": "标题背景颜色",
                    "type": "backgroundColor",
                    "component": "configureColor",
                    "value": "rgba(255, 255, 255, 0)",
                    "jsonData": [
                      "#00ced1",
                      "#1e90ff",
                      "#c71585",
                      "rgba(255, 69, 0, 0.68)",
                      "rgb(255, 120, 0)",
                      "hsv(51, 100, 98)"
                    ],
                    "configures_id": 1683867964878,
                    "created_at": "2023-05-15T03:18:12.000Z",
                    "updated_at": "2023-05-15T04:42:26.000Z",
                    "values": []
                  },
                  {
                    "id": 70,
                    "label": "标题边框颜色",
                    "type": "borderColor",
                    "component": "configureColor",
                    "value": "rgba(255, 255, 255, 0)",
                    "jsonData": [
                      "#00ced1",
                      "#1e90ff",
                      "#c71585",
                      "rgba(255, 69, 0, 0.68)",
                      "rgb(255, 120, 0)",
                      "hsv(51, 100, 98)"
                    ],
                    "configures_id": 1683867964878,
                    "created_at": "2023-05-15T03:20:37.000Z",
                    "updated_at": "2023-05-15T04:42:26.000Z",
                    "values": []
                  },
                  {
                    "id": 97,
                    "label": "标题边框宽度",
                    "type": "borderWidth",
                    "component": "configureInput",
                    "value": "0",
                    "jsonData": [],
                    "configures_id": 1683867964878,
                    "created_at": "2023-05-15T04:42:26.000Z",
                    "updated_at": "2023-05-15T04:42:26.000Z",
                    "values": []
                  }
                ],
                "default": []
              },
              {
                "id": 1684125693382,
                "label": "图例配置",
                "type": "legend",
                "component": "configureChartList",
                "value": "",
                "disabled": "0",
                "jsonData": "",
                "defaults_id": 1683867928951,
                "created_at": "2023-05-15T04:42:26.000Z",
                "updated_at": "2023-05-15T09:02:11.000Z",
                "values": [
                  {
                    "id": 111,
                    "label": "图例类型",
                    "type": "type",
                    "component": "configureSelect",
                    "value": "plain",
                    "jsonData": ["plain", "scroll"],
                    "configures_id": 1684125693382,
                    "created_at": "2023-05-15T04:55:05.000Z",
                    "updated_at": "2023-05-15T09:28:44.000Z",
                    "values": []
                  },
                  {
                    "id": 112,
                    "label": "显示图例",
                    "type": "show",
                    "component": "configureSwitch",
                    "value": "1",
                    "jsonData": null,
                    "configures_id": 1684125693382,
                    "created_at": "2023-05-15T05:25:41.000Z",
                    "updated_at": "2023-05-15T09:28:44.000Z",
                    "values": []
                  },
                  {
                    "id": 114,
                    "label": "左距离",
                    "type": "left",
                    "component": "configureSelect",
                    "value": "auto",
                    "jsonData": ["left", "center", "right"],
                    "configures_id": 1684125693382,
                    "created_at": "2023-05-15T06:09:06.000Z",
                    "updated_at": "2023-05-15T09:28:44.000Z",
                    "values": []
                  },
                  {
                    "id": 115,
                    "label": "顶部距离",
                    "type": "top",
                    "component": "configureSelect",
                    "value": "top",
                    "jsonData": ["top", "middle", "bottom"],
                    "configures_id": 1684125693382,
                    "created_at": "2023-05-15T06:09:06.000Z",
                    "updated_at": "2023-05-15T09:28:44.000Z",
                    "values": []
                  },
                  {
                    "id": 118,
                    "label": "图例布局朝向",
                    "type": "orient",
                    "component": "configureSelect",
                    "value": "vertical",
                    "jsonData": ["horizontal", "vertical"],
                    "configures_id": 1684125693382,
                    "created_at": "2023-05-15T06:19:35.000Z",
                    "updated_at": "2023-05-15T09:28:44.000Z",
                    "values": []
                  },
                  {
                    "id": 123,
                    "label": "图例标记和文本对齐",
                    "type": "align",
                    "component": "configureSelect",
                    "value": "auto",
                    "jsonData": ["auto", "left", "right"],
                    "configures_id": 1684125693382,
                    "created_at": "2023-05-15T07:53:02.000Z",
                    "updated_at": "2023-05-15T09:28:44.000Z",
                    "values": []
                  },
                  {
                    "id": 138,
                    "label": "标题样式",
                    "type": "textStyle",
                    "component": "configureChartList",
                    "value": null,
                    "jsonData": null,
                    "configures_id": 1684125693382,
                    "created_at": "2023-05-15T09:00:53.000Z",
                    "updated_at": "2023-05-15T09:28:44.000Z",
                    "values": [
                      {
                        "id": 52,
                        "label": "字体阴影Y偏移",
                        "type": "textShadowOffsetY",
                        "value": "0",
                        "component": "configureInput",
                        "jsonData": null,
                        "created_at": "2023-05-15T09:02:11.000Z",
                        "updated_at": "2023-05-15T09:28:44.000Z",
                        "value_id": 138
                      },
                      {
                        "id": 53,
                        "label": "字体阴影X偏移",
                        "type": "textShadowOffsetX",
                        "value": "0",
                        "component": "configureInput",
                        "jsonData": null,
                        "created_at": "2023-05-15T09:02:11.000Z",
                        "updated_at": "2023-05-15T09:28:44.000Z",
                        "value_id": 138
                      },
                      {
                        "id": 54,
                        "label": "字体阴影长度",
                        "type": "textShadowBlur",
                        "value": "0",
                        "component": "configureInput",
                        "jsonData": null,
                        "created_at": "2023-05-15T09:02:11.000Z",
                        "updated_at": "2023-05-15T09:28:44.000Z",
                        "value_id": 138
                      },
                      {
                        "id": 55,
                        "label": "字体阴影",
                        "type": "textShadowColor",
                        "value": "transparent",
                        "component": "configureColor",
                        "jsonData": [
                          "#00ced1",
                          "#1e90ff",
                          "#c71585",
                          "rgba(255, 69, 0, 0.68)",
                          "rgb(255, 120, 0)",
                          "hsv(51, 100, 98)"
                        ],
                        "created_at": "2023-05-15T09:02:11.000Z",
                        "updated_at": "2023-05-15T09:28:44.000Z",
                        "value_id": 138
                      },
                      {
                        "id": 56,
                        "label": "字体描边颜色",
                        "type": "textBorderColor",
                        "value": "#000000",
                        "component": "configureColor",
                        "jsonData": [
                          "#00ced1",
                          "#1e90ff",
                          "#c71585",
                          "rgba(255, 69, 0, 0.68)",
                          "rgb(255, 120, 0)",
                          "hsv(51, 100, 98)"
                        ],
                        "created_at": "2023-05-15T09:02:11.000Z",
                        "updated_at": "2023-05-15T09:28:44.000Z",
                        "value_id": 138
                      },
                      {
                        "id": 57,
                        "label": "字体大小",
                        "type": "fontSize",
                        "value": "18",
                        "component": "configureInput",
                        "jsonData": null,
                        "created_at": "2023-05-15T09:02:11.000Z",
                        "updated_at": "2023-05-15T09:28:44.000Z",
                        "value_id": 138
                      },
                      {
                        "id": 58,
                        "label": "字体宽度",
                        "type": "fontWeight",
                        "value": "bolder",
                        "component": "configureSelect",
                        "jsonData": [
                          "normal",
                          "bold",
                          "bolder",
                          "lighter",
                          100,
                          200,
                          300,
                          400,
                          500,
                          600,
                          700,
                          800,
                          900
                        ],
                        "created_at": "2023-05-15T09:02:11.000Z",
                        "updated_at": "2023-05-15T09:28:44.000Z",
                        "value_id": 138
                      },
                      {
                        "id": 59,
                        "label": "字体样式",
                        "type": "fontStyle",
                        "value": "normal",
                        "component": "configureSelect",
                        "jsonData": ["normal", "italic", "oblique"],
                        "created_at": "2023-05-15T09:02:11.000Z",
                        "updated_at": "2023-05-15T09:28:44.000Z",
                        "value_id": 138
                      },
                      {
                        "id": 60,
                        "label": "字体颜色",
                        "type": "color",
                        "value": "#000000",
                        "component": "configureColor",
                        "jsonData": [
                          "#00ced1",
                          "#1e90ff",
                          "#c71585",
                          "rgba(255, 69, 0, 0.68)",
                          "rgb(255, 120, 0)",
                          "hsv(51, 100, 98)"
                        ],
                        "created_at": "2023-05-15T09:02:11.000Z",
                        "updated_at": "2023-05-15T09:02:11.000Z",
                        "value_id": 138
                      }
                    ]
                  }
                ],
                "default": []
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 3,
    "label": "装饰",
    "type": "decorate",
    "icon": "el-icon-s-open",
    "component": "chartList",
    "created_at": "2023-04-03T07:42:11.000Z",
    "updated_at": "2023-04-03T07:42:13.000Z",
    "items": [
      {
        "id": 5,
        "label": "修狗图片",
        "type": "img",
        "imgPath": null,
        "icon": null,
        "component": "designImg",
        "template_id": 3,
        "created_at": "2023-04-03T07:48:45.000Z",
        "updated_at": "2023-04-03T07:48:47.000Z",
        "default": [
          {
            "id": 8,
            "label": "数据源配置",
            "type": "configure",
            "icon": null,
            "component": "configureList",
            "components_id": 5,
            "created_at": "2023-04-03T09:27:53.000Z",
            "updated_at": "2023-04-03T09:27:55.000Z",
            "configure": [
              {
                "id": 22,
                "label": "图片url",
                "type": "src",
                "component": "configureInput",
                "value": "https://img1.baidu.com/it/u=1795611050,2013221134&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800",
                "disabled": null,
                "jsonData": null,
                "defaults_id": 8,
                "created_at": "2023-04-03T09:26:19.000Z",
                "updated_at": "2023-04-03T09:26:22.000Z",
                "values": [],
                "default": []
              }
            ]
          },
          {
            "id": 9,
            "label": "定位配置",
            "type": "position",
            "icon": null,
            "component": "configureList",
            "components_id": 5,
            "created_at": "2023-04-03T09:28:27.000Z",
            "updated_at": "2023-04-03T09:28:29.000Z",
            "configure": [
              {
                "id": 23,
                "label": "宽度(px)",
                "type": "width",
                "component": "configureInput",
                "value": "500",
                "disabled": "0",
                "jsonData": null,
                "defaults_id": 9,
                "created_at": "2023-04-03T09:29:11.000Z",
                "updated_at": "2023-04-03T09:29:14.000Z",
                "values": [],
                "default": []
              },
              {
                "id": 24,
                "label": "高度(px)",
                "type": "height",
                "component": "configureInput",
                "value": "450",
                "disabled": "0",
                "jsonData": null,
                "defaults_id": 9,
                "created_at": "2023-04-03T09:31:23.000Z",
                "updated_at": "2023-04-03T09:31:25.000Z",
                "values": [],
                "default": []
              },
              {
                "id": 25,
                "label": "top(px)",
                "type": "top",
                "component": "configureInput",
                "value": "0",
                "disabled": "0",
                "jsonData": null,
                "defaults_id": 9,
                "created_at": "2023-04-03T09:31:48.000Z",
                "updated_at": "2023-04-03T09:31:51.000Z",
                "values": [],
                "default": []
              },
              {
                "id": 26,
                "label": "left(px)",
                "type": "left",
                "component": "configureInput",
                "value": "0",
                "disabled": "0",
                "jsonData": null,
                "defaults_id": 9,
                "created_at": "2023-04-03T09:32:12.000Z",
                "updated_at": "2023-04-03T09:32:14.000Z",
                "values": [],
                "default": []
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 4,
    "label": "字体",
    "type": "font",
    "icon": "el-icon-info",
    "component": "chartList",
    "created_at": "2023-04-25T05:52:08.000Z",
    "updated_at": "2023-04-25T05:52:11.000Z",
    "items": [
      {
        "id": 6,
        "label": "字体",
        "type": "font",
        "imgPath": null,
        "icon": null,
        "component": "designFont",
        "template_id": 4,
        "created_at": "2023-05-05T02:16:27.000Z",
        "updated_at": "2023-05-05T02:16:30.000Z",
        "default": [
          {
            "id": 12,
            "label": "样式配置",
            "type": "configure",
            "icon": null,
            "component": "configureList",
            "components_id": 6,
            "created_at": "2023-05-05T02:17:43.000Z",
            "updated_at": "2023-05-05T02:17:45.000Z",
            "configure": [
              {
                "id": 1684202355434,
                "label": "内容",
                "type": "font",
                "component": "configureInput",
                "value": "",
                "disabled": "0",
                "jsonData": {},
                "defaults_id": 12,
                "created_at": "2023-05-16T01:59:18.000Z",
                "updated_at": "2023-05-16T01:59:18.000Z",
                "values": [],
                "default": []
              }
            ]
          },
          {
            "id": 1684201094259,
            "label": "定位配置",
            "type": "position",
            "icon": "",
            "component": "configureList",
            "components_id": 6,
            "created_at": "2023-05-16T01:38:19.000Z",
            "updated_at": "2023-05-16T01:38:19.000Z",
            "configure": [
              {
                "id": 1684142920399,
                "label": "宽度(px)",
                "type": "width",
                "component": "configureInput",
                "value": "500",
                "disabled": "0",
                "jsonData": null,
                "defaults_id": 1684201094259,
                "created_at": "2023-05-16T01:38:19.000Z",
                "updated_at": "2023-05-16T01:38:19.000Z",
                "values": [],
                "default": []
              },
              {
                "id": 1684142920400,
                "label": "高度(px)",
                "type": "height",
                "component": "configureInput",
                "value": "450",
                "disabled": "0",
                "jsonData": null,
                "defaults_id": 1684201094259,
                "created_at": "2023-05-16T01:38:19.000Z",
                "updated_at": "2023-05-16T01:38:19.000Z",
                "values": [],
                "default": []
              },
              {
                "id": 1684142920401,
                "label": "top(px)",
                "type": "top",
                "component": "configureInput",
                "value": "0",
                "disabled": "0",
                "jsonData": null,
                "defaults_id": 1684201094259,
                "created_at": "2023-05-16T01:38:19.000Z",
                "updated_at": "2023-05-16T01:38:19.000Z",
                "values": [],
                "default": []
              },
              {
                "id": 1684142920402,
                "label": "left(px)",
                "type": "left",
                "component": "configureInput",
                "value": "0",
                "disabled": "0",
                "jsonData": null,
                "defaults_id": 1684201094259,
                "created_at": "2023-05-16T01:38:19.000Z",
                "updated_at": "2023-05-16T01:38:19.000Z",
                "values": [],
                "default": []
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

1. 整个画布的设计思想基于 vue 的 component 组件，从而实现组件间的层叠嵌套布局与
   渲染。
2. 初始化画布后，除开画布自身配置，需要使用布局组件库组件进行布局后，才允许插入
   普通组件。
3. 工作中的渲染树数据，存放于 store 的 charts.js 仓库中的 canvasData 中。
4. layout 组件实现不同布局模式的思路，在于创建一个 layout 组件后，designUI -
   components - layoutBox.vue 组件将会根据不同布局模式一个一个 push 入 layout 的
   children 数组中

工作流程：

1. 左侧拖出一个组件，调用 other/set_templateData 向 store/other.js 中保存一份模
   板数据，用于在画布中创建视图
2. 组件放入画布或者某类布局组件中，对应容器组件识别拖拽 API 提供的组件类型（某个
   模板的 json 数据中对应组件的 type），通过类型拷贝一份
   store/other.js/templateData 中对应数据
3. 调用 charts/add_canvasDataChild（添加画布亲子代组件）或 charts/add_chart（添
   加组件）向当前工作中的渲染书对象，添加子孙组件
4. 向 charts/configureList 对象添加数据，configureList 是右侧边栏样式修改的数据
   源，传入某个模板的 json 数据中对应的 default 数组
5. 修改右侧边栏某个样式的值，调用 charts.js/modify_canvasDataChild ->
   findChildChart 找到目标组件在渲染树中的数据，并修改，组件监听到渲染树数据改变
   ，更新视图

```javascript
this.modify_canvasDataChild({
  fatherId: this.propsData.fatherId, //用于区分父组件是否是画布，解决在修改画布亲代子组件的数据时出现找不到目标组件的问题
  id: this.propsData.id, // 当前组件的ID，用于找到渲染树中的组件数据
  data: {
    key: 'top', // 需要修改的数据的key
    value: '', // 需要修改的数据的value
  },
  type: 'position', // 区分是哪个配置项（position:模板json数据中控制宽高以及定位，其余还有configure样式配置，dataFrom数据源配置，具体请自行查看上方的二中的数据结构）
})
```

​ 6. 当拖动组件或缩放组件时，由于右侧边栏修改数据是单向的，因此需用到
other/inputValue 数据实时更新右侧边栏视图
