//获取数据源demo1-GET
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
