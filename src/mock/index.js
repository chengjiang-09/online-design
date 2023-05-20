import Mock from 'mockjs'

import {
  getDataFromDemo1,
  postDataFromDemo2,
  getDataFromDemo3,
  getDataFromDemo4,
} from './dataFromMock'

Mock.setup({
  timeout: '500-1000',
})

getDataFromDemo1(Mock)
postDataFromDemo2(Mock)
getDataFromDemo3(Mock)
getDataFromDemo4(Mock)
