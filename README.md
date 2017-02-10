[![NPM](https://nodei.co/npm/sd-logger.png?downloads=true)](https://nodei.co/npm/sd-logger/)  

[![npm version](https://badge.fury.io/js/sd-logger.svg)](https://badge.fury.io/js/sd-logger)
[![GitHub version](https://badge.fury.io/gh/chanyying%2Fsd-Logger.svg)](https://badge.fury.io/gh/chanyying%2Fsd-Logger)
[![GitHub version](https://img.shields.io/github/issues/chanyying/sd-logger.svg)](https://img.shields.io/github/issues/chanyying/sd-logger.svg)

### 安装使用

    npm install sd-logger --save-dev
    import Logger from 'sd-logger'

### 全局安装：

    Vue.use(Logger, {
      name: '业务域名称', // 必填
      server: '服务器地址' // 必填
    })


### 代码异常

默认任何情况下，当前访问地址和代码异常会收集起来。

    s1: 访问地址
    s2: 代码异常

### 配置&&说明

##### 日志类型

    type: {
      1: 代码异常 // 默认
      2: 接口异常
      3: 性能分析
      4: 特殊状态码
      5: 普通打点
    }

##### 接口案例

    t1: 业务名称,
    t2: 日志类型,
    s1: 访问地址,
    s2: 代码异常,
    s3: API请求时间,
    s4: 路由切换时间,
    s5: API 地址,
    s6: API code,
    s7: 错误信息,
    s8: API Token
    
    logs/?t1=''&t2=''&s1='-'&s2='-'&s3='-'&s4='-'&s5='-'&s6='-'&s7='-'&s8='-'


### 局部使用：

    this.$Logger(type<必填项>, {
      // 错误信息
    })

### 接口异常
在接口不为0的情况下，处理接口错误异常，打点示例:

    this.$Logger(type, {
      api_code: res.data.code,
      api_msg: res.data.msg
    })

### 性能分析

##### 路由时间

    let startTime = ''
    router.beforeEach(()=>{
      startTime = new Date().getTime()
    })
    router.afterEach(()=>{
      this.$Logger({
        router_time: new Date().getTime() - starTime
      })
    })


##### 接口时间

    let startTime = new Date().getTime()
    
    Vue.Logger({
      api_url:  request.url,
      api_time:  new Date().getTime() - startTime,
      api_code:  res.data.code,
      api_msg:  res.data.msg,
      api_token: request.token
    })
