const loadBMAp = () => {
  return new Promise((resolve, reject) => {
    window.init = function () {
      resolve(BMapGL)
    }
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `http://api.map.baidu.com/api?v=3.0&type=webgl&ak=s9n9uB1491blOHVc4h7FoZOzI1wiECyh&callback=init`
    document.head.appendChild(script)

  })
}



export default loadBMAp