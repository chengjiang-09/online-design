import Mock from 'mockjs'

import {
  getDataFromDemo1,
  postDataFromDemo2,
  getDataFromDemo3,
  getDataFromDemo4,
  getDataFromDemo5,
  getDataFromDemo6,
  getDataFromDemo7,
  getDataFromDemo8,
  getDataFromDemo9,
  getDataFromDemo10,
} from './dataFromMock'

Mock.setup({
  timeout: '500-1000',
})

getDataFromDemo1(Mock)
postDataFromDemo2(Mock)
getDataFromDemo3(Mock)
getDataFromDemo4(Mock)
getDataFromDemo5(Mock)
getDataFromDemo6(Mock)
getDataFromDemo7(Mock)
getDataFromDemo8(Mock)
getDataFromDemo9(Mock)
getDataFromDemo10(Mock)
