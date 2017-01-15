[![NPM](https://nodei.co/npm/sd-logger.png)](https://nodei.co/npm/sd-logger/)  

[![npm version](https://badge.fury.io/js/sd-logger.svg)](https://badge.fury.io/js/sd-logger)
[![GitHub version](https://badge.fury.io/gh/chanyying%2Fsd-Logger.svg)](https://badge.fury.io/gh/chanyying%2Fsd-Logger)
[![GitHub version](https://img.shields.io/github/issues/chanyying/sd-logger.svg)](https://img.shields.io/github/issues/chanyying/sd-logger.svg)

### 安装使用

    npm install sd-logger --save-dev
    import Logger from 'sd-logger'

### 全局安装：

    Vue.use(Logger, {
      name: '业务域名称',
      server_address: '服务器地址'
    })


### 局部使用：

    this.$Logger({
    // 错误信息
    })
 
### 代码异常

默认任何情况下，当前访问地址和代码异常会收集起来。

    s1: 访问地址
    s2: 代码错误信息

### 接口异常
在接口不为0的情况下，处理接口错误异常，打点示例:

    this.$Logger({
	  code: res.data.code,
	  msg: res.data.msg
    })

### 性能分析
#### 路由时间

	let startTime = ''
	router.beforeEach(()=>{
		startTime = new Date().getTime()
	})
	router.afterEach(()=>{
		this.$Logger({
			router_time: new Date().getTime() - starTime
		})
	})


#### 接口时间

	let startTime = new Date().getTime()
	
    Vue.Logger({
		api_url:  request.url,
	    api_time:  new Date().getTime() - startTime,
	    code:  res.data.code,
		msg:  res.data.msg
    })
