
const isDev = process.env.NODE_ENV === 'development'
const url = isDev ? 'http://127.0.0.1:3001' : 'http://47.106.221.76:3001'
// const url = "https://liangx.top/epidemic-server/"
module.exports = {
  // 网站标题
  title: '数据可视化展示平台',
  // 接口地址
  baseURL: url,
  // cos读取图片的地址
  cosUrl: 'https://liangx-1302611204.cos.ap-nanjing.myqcloud.com/userImg/',


}