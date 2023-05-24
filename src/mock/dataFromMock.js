//获取数据源demo1-GET
const getRadomNum = (max = 1, min = 0) => {
  return Math.random() * max + min
}

const getArrayNum = (num = 10, max = 1, min = 0) => {
  let arr = []
  for (let i = 0; i < num; i++) {
    arr.push(Math.ceil(getRadomNum(max, min)))
  }
  return arr
}

export const getDataFromDemo1 = (Mock) => {
  return Mock.mock('http://127.0.0.1:8001/dataFrom/demo1', 'get', () => {
    return {
      code: 1,
      message: '',
      data: {
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          type: 'category',
        },
        yAxis: { type: 'value' },
        series: [{ data: [400, 450, 460, 300, 200, 147, 260], type: 'line' }],
      },
    }
  })
}

//获取数据源demo1-GET
export const postDataFromDemo2 = (Mock) => {
  return Mock.mock('http://127.0.0.1:8001/dataFrom/demo1', 'post', (data) => {
    let a = {
      tom: [50, 450, 460, 300, 200, 147, 260],
      jerry: [100, 200, 460, 300, 200, 147, 260],
    }
    return {
      code: 1,
      message: '',
      data: {
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          type: 'category',
        },
        yAxis: { type: 'value' },
        series: [
          {
            data: a[
              JSON.parse(data.body).name ? JSON.parse(data.body).name : 'tom'
            ],
            type: 'line',
          },
        ],
      },
    }
  })
}

export const getDataFromDemo3 = (Mock) => {
  return Mock.mock('http://127.0.0.1:8001/dataFrom/demo3', 'get', () => {
    return {
      code: 1,
      msg: '模拟表格数据',
      data: {
        headerData: [
          {
            prop: 'date',
            label: '日期',
          },
          {
            prop: 'name',
            label: '名称',
          },
          {
            prop: 'address',
            label: '地址',
          },
        ],
        tableData: [
          {
            date: '2016-05-03',
            name: '张三',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-02',
            name: '张三',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-04',
            name: '张三',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-01',
            name: '张三',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-08',
            name: '张三',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-06',
            name: '张三',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-07',
            name: '张三',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-03',
            name: '张三',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-02',
            name: '张三',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-04',
            name: '张三',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-01',
            name: '张三',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-08',
            name: '张三',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-06',
            name: '张三',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-07',
            name: '张三',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-03',
            name: '张三',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-02',
            name: '张三',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-04',
            name: '张三',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-01',
            name: '张三',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-08',
            name: '张三',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-06',
            name: '张三',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-07',
            name: '张三',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-03',
            name: '张三',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-02',
            name: '张三',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-04',
            name: '张三',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-01',
            name: '张三',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-08',
            name: '张三',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-06',
            name: '张三',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-07',
            name: '张三',
            address: '上海市普陀区金沙江路 1518 弄',
          },
        ],
      },
    }
  })
}

export const getDataFromDemo4 = (Mock) => {
  return Mock.mock('http://127.0.0.1:8001/dataFrom/demo4', 'get', () => {
    return {
      code: 1,
      msg: '模拟表格数据',
      data: {
        headerData: [
          {
            prop: 'date',
            label: '日期',
          },
          {
            prop: 'name',
            label: '名称',
          },
          {
            prop: 'address',
            label: '地址',
          },
        ],
        tableData: [
          {
            date: '2016-05-03',
            name: '王五',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-02',
            name: '王五',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-04',
            name: '王五',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-01',
            name: '王五',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-08',
            name: '王五',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-06',
            name: '王五',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-07',
            name: '王五',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-03',
            name: '王五',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-02',
            name: '王五',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-04',
            name: '王五',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-01',
            name: '王五',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-08',
            name: '王五',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-06',
            name: '王五',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-07',
            name: '王五',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-03',
            name: '王五',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-02',
            name: '王五',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-04',
            name: '王五',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-01',
            name: '王五',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-08',
            name: '王五',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-06',
            name: '王五',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-07',
            name: '王五',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-03',
            name: '王五',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-02',
            name: '王五',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-04',
            name: '王五',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-01',
            name: '王五',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-08',
            name: '王五',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-06',
            name: '王五',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-07',
            name: '王五',
            address: '上海市普陀区金沙江路 1518 弄',
          },
        ],
      },
    }
  })
}

export const getDataFromDemo5 = (Mock) => {
  return Mock.mock('http://127.0.0.1:8001/dataFrom/demo5', 'get', () => {
    return {
      code: 1,
      msg: '模拟月度订单',
      data: {
        xAxis: {
          data: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月',
          ],
          type: 'category',
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: getArrayNum(12, 1000, 100),
            name: '商品A',
            type: 'bar',
          },
        ],
      },
    }
  })
}

export const getDataFromDemo6 = (Mock) => {
  return Mock.mock('http://127.0.0.1:8001/dataFrom/demo6', 'get', () => {
    return {
      code: 1,
      msg: '模拟销售Top10',
      data: {
        tableData: [
          '华威',
          '阿狸',
          '联箱',
          '北京事业部',
          '上海事业部',
          '深圳事业部',
          '广东事业部',
          '贵州事业部',
          '四川事业部',
          '南京事业部',
        ].map((key, index) => {
          return {
            top: index + 1,
            path: key,
            add: Math.ceil(getRadomNum(9000, 4000)),
            month: Math.ceil(getRadomNum(3000, 1000)),
            year: Math.ceil(getRadomNum(5000, 2000)),
            lastYear: Math.ceil(getRadomNum(5000, 2000)),
          }
        }),
        headerData: [
          {
            prop: 'top',
            label: '排名',
          },
          {
            prop: 'path',
            label: '渠道',
          },
          {
            prop: 'add',
            label: '总计',
          },
          {
            prop: 'month',
            label: '本月订单',
          },
          {
            prop: 'year',
            label: '本年订单',
          },
          {
            prop: 'lastYear',
            label: '上年订单',
          },
        ],
      },
    }
  })
}

export const getDataFromDemo7 = (Mock) => {
  return Mock.mock('http://127.0.0.1:8001/dataFrom/demo7', 'get', function () {
    this.numAll = 0
    return {
      code: 1,
      msg: '模拟销售Top10',
      data: {
        series: [
          {
            data: [
              '手机',
              '笔记本电脑',
              '音响',
              '电视',
              '蓝牙耳机',
              '平板电脑',
              '轻薄笔记本',
              '键盘',
              '鼠标',
              '适配器',
            ]
              .map((key) => {
                let num = Math.ceil(getRadomNum(3000, 500))
                this.numAll += num
                return {
                  name: key,
                  value: num,
                }
              })
              .map((obj) => {
                return {
                  name: `${obj.name}(${Math.round(
                    (obj.value / this.numAll) * 100,
                  )}%)`,
                  value: obj.value,
                }
              }),
            name: '销售Top10',
            type: 'pie',
            radius: ['40%', '70%'],
            label: {
              show: true,
              position: 'center',
            },
            labelLine: {
              show: false,
            },
            avoidLabelOverlap: false,
          },
        ],
      },
    }
  })
}

export const getDataFromDemo8 = (Mock) => {
  return Mock.mock('http://127.0.0.1:8001/dataFrom/demo8', 'get', function () {
    this.numAll = 0
    return {
      code: 1,
      msg: '模拟销售Top10',
      data: {
        series: [
          {
            data: [
              '广州市',
              '嵊州市',
              '深圳市',
              '北京市',
              '成都市',
              '重庆市',
              '沈阳市',
              '贵阳市',
              '南京市',
              '都匀市',
            ]
              .map((key) => {
                let num = Math.ceil(getRadomNum(3000, 500))
                this.numAll += num
                return {
                  name: key,
                  value: num,
                }
              })
              .map((obj) => {
                return {
                  name: `${obj.name}(${Math.round(
                    (obj.value / this.numAll) * 100,
                  )}%)`,
                  value: obj.value,
                }
              }),
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            label: {
              show: true,
              position: 'center',
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0,0,0,0.5)',
                shadowOffsetX: 0,
              },
            },
          },
        ],
      },
    }
  })
}

export const getDataFromDemo9 = (Mock) => {
  return Mock.mock('http://127.0.0.1:8001/dataFrom/demo9', 'get', function () {
    this.numAll = 0
    return {
      code: 1,
      msg: '模拟销售Top10',
      data: {
        series: [
          {
            data: ['ARF', 'TUO', '集团', '代理', '市场']
              .map((key) => {
                let num = Math.ceil(getRadomNum(3000, 500))
                this.numAll += num
                return {
                  name: key,
                  value: num,
                }
              })
              .map((obj) => {
                return {
                  name: `${obj.name}(${Math.round(
                    (obj.value / this.numAll) * 100,
                  )}%)`,
                  value: obj.value,
                }
              }),
            name: 'Nightingale Chart',
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['10%', '70%'],
            roseType: 'area',
            label: {
              show: true,
              position: 'center',
            },
            itemStyle: {
              borderRadius: 8,
            },
          },
        ],
      },
    }
  })
}

export const getDataFromDemo10 = (Mock) => {
  return Mock.mock('http://127.0.0.1:8001/dataFrom/demo10', 'get', function () {
    this.numAll = 0
    return {
      code: 1,
      msg: '模拟销售Top10',
      data: [
        'https://img0.baidu.com/it/u=3555474865,2507448695&fm=253&fmt=auto&app=120&f=PNG?w=600&h=476',
        'https://img2.baidu.com/it/u=1958435488,2705986120&fm=253&fmt=auto&app=120&f=JPEG?w=593&h=500',
        'https://img1.baidu.com/it/u=158279638,2762814527&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
        'https://img2.baidu.com/it/u=89518331,2719265961&fm=253&fmt=auto&app=138&f=JPEG?w=604&h=500',
      ],
    }
  })
}
