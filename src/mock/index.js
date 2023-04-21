import Mock from 'mockjs'

import { getDataFromDemo1, postDataFromDemo2 } from './dataFromMock'

Mock.setup({
  timeout: '500-1000',
})

getDataFromDemo1(Mock)
postDataFromDemo2(Mock)
