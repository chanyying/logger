/*
  @author  caihanyong | caihanyong@shuidihuzhu.com
  @version 1.0 | 2017-1-15
  @example

 */

// 访问地址，发生错误信息的地址
const ACCESS_ADDRESS = encodeURIComponent(window.location.href)

// Vue 插件
const Logger = function (Vue, option) {
  if (Logger.installed) {
    return
  }

  let BUSINESS_NAME = option.name
  let SERVER_ADDRESS = option.server_address

  if (!BUSINESS_NAME) BUSINESS_NAME = ACCESS_ADDRESS

  if (!SERVER_ADDRESS) {
    console.error(`Vue.use(Logger, {
  server_address: '请输入错误日志上传地址'
})`)
  }

  Vue.Logger = err
  Vue.prototype.$Logger = err

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

  function params (...obj) {
    let param = Object.assign({}, ...obj)
    let str = ''
    for (let i in param) {
      str += `${i}=${param[i]}&`
    }
    str = str.substring(0, str.length - 1)
    return `/?${str}`
  }

  // this.$Logger(type, object)

  function err (data) {
    let isErrorLog = !!errorLog
    if (isErrorLog) codeErr = {err: errorLog.msg}
    let obj = Object.assign({
      url: ACCESS_ADDRESS
    }, codeErr, data)
    let param = params(obj)
    upload(param)
  }

  // 上传业务名称，错误类型分类，错误信息，
  function upload (data) {
    let image = new window.Image()
    image.src = `${SERVER_ADDRESS}${BUSINESS_NAME}/logs${data}`
    console.log(`${SERVER_ADDRESS}${BUSINESS_NAME}/logs${data}`)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Logger)
}

module.exports = Logger
