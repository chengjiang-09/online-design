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
      tom: [400, 450, 460, 300, 200, 147, 260],
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
        series: [{ data: a[JSON.parse(data.body).name], type: 'line' }],
      },
    }
  })
}
