/*
  @author  caihanyong | caihanyong@shuidihuzhu.com
  @version 1.0 | 2017-1-15
  @example
  s1: 访问地址
  s2: 代码错误信息
  api_time: API时间
  router_time: 路由时间
  api_url: API地址
  code: 后端错误状态码
  msg: 后端错误信息
  <业务域>/logs/?s1=''&s2=''&code=''&msg=''
 */

// 访问地址，发生错误信息的地址
const ACCESS_ADDRESS = encodeURIComponent(window.location.href)

// Vue 插件
const Logger = function (Vue, option) {
  if (Logger.installed) {
    return
  }

  Vue.Logger = err
  Vue.prototype.$Logger = err

  // 配置项

  let BUSINESS_NAME = option.name
  let SERVER_ADDRESS = option.server

  // 存放拦截window.onerror和Vue.common.js的错误信息

  let errorLog = {}

  // 重写console 获取 vue错误信息

  console.error = (function (origin) {
    return function (errorlog) {
      errorLog = {
        msg: errorlog
      }
      origin.call(console, errorlog)
    }
  })(console.error)

  // 抓取window onerror

  window.onerror = function (messageOrEvent, source, lineno, colno, error) {
    errorLog = {
      msg: messageOrEvent + ' at ' + source + ':' + lineno + ':' + colno
    }
  }

  // 将错误日志转换为URL 参数

  function params (...obj) {
    let param = Object.assign({}, ...obj)
    let str = ''
    for (let i in param) {
      str += `${i}=${param[i]}&`
    }
    str = str.substring(0, str.length - 1)
    return `/?${str}`
  }

  function checkOption () {
    if (!errorLog.hasOwnProperty('msg')) errorLog.msg = ''

    if (!SERVER_ADDRESS || !BUSINESS_NAME) { console.error('请检查业务名称和log服务地址是否为空!') }

    if (SERVER_ADDRESS && SERVER_ADDRESS.charAt(SERVER_ADDRESS.length - 1) !== '/') { SERVER_ADDRESS = SERVER_ADDRESS + '/' }
  }

  // this.$Logger(type, object)

  function err (logs_type, data) {
    checkOption ()

    let param = params({
      t1: BUSINESS_NAME,
      t2: logs_type || '',
      s1: ACCESS_ADDRESS,
      s2: errorLog.msg,
      s3: data.api_time || '',
      s4: data.router_time || '',
      s5: data.api_url || '',
      s6: data.api_code || '',
      s7: data.api_msg || ''
    })

    upload(param)
  }

  // 上传业务名称，错误类型分类，错误信息
  function upload (data) {
    let image = new window.Image()
    image.src = `${SERVER_ADDRESS}logs${data}`
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Logger)
}

module.exports = Logger
