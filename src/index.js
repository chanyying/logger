/*
  @author  caihanyong | caihanyong@shuidihuzhu.com
  @version 1.0 | 2017-1-15
  @example
  t1: 业务名称,
  t2: 日志类型 || '',
  s1: 访问地址,
  s2: 代码异常,
  s3: API请求时间 || '',
  s4: 路由切换时间 || '',
  s5: API 地址 || '',
  s6: API code || '',
  s7: API 错误信息 || ''
  logs/?t1=''&t2=''&s1='-'&s2='-'&s3='-'&s4='-'&s5='-'&s6='-'&s7='-'
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
    if (!SERVER_ADDRESS || !BUSINESS_NAME) { console.error('请检查业务名称和log服务地址是否为空!') }

    if (SERVER_ADDRESS && SERVER_ADDRESS.charAt(SERVER_ADDRESS.length - 1) !== '/') { SERVER_ADDRESS = SERVER_ADDRESS + '/' }
  }

  // this.$Logger(type, object)

  function err (logs_type, data) {
    checkOption ()

    let param = params({
      t1: BUSINESS_NAME,
      t2: logs_type || '1',
      s1: ACCESS_ADDRESS,
      s2: errorLog.msg || '-',
      s3: data.api_time || '-',
      s4: data.router_time || '-',
      s5: data.api_url || '-',
      s6: data.api_code || '-',
      s7: data.api_msg || '-',
      s8: data.api_token || '-'
    })
    upload(param)
  }

  // 上传业务名称，错误类型分类，错误信息
  function upload (data) {
    var img = new Image()
    img.src = `${SERVER_ADDRESS}logs${data}`
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Logger)
}

module.exports = Logger
