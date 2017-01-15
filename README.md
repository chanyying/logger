### 安装使用

    npm install sd-logger
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