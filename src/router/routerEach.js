import router from './index'
router.beforeEach(async (to, from, next) => {
  document.title = '疫情数据可视化平台'
  next()
})


