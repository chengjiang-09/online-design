import Mock from 'mockjs'

import { getChartsList, getHeaderMenu } from './chartsMock'

Mock.setup({
  timeout: '500-1000',
})

getChartsList(Mock)
getHeaderMenu(Mock)
