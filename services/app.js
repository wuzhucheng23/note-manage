// 引入koa2
const Koa = require('koa2')
const app = new Koa()

// 解决跨域
const cors = require('koa2-cors')
app.use(cors())

// 解决获取静态资源文件
const static = require('koa-static')
const path = require('path')
app.use(static(path.join(__dirname + '/assets')))

// 使用中间件
const router = require('./router/index') // 引入路由
app.use(router.routes(), router.allowedMethods()) // router.routes()作用是启动路由，router.allowedMethod()作用是允许任何请求(get, post, put, ~~~)

// 监听端口
const config = require('./config/index')
const port = config.port
app.listen(port, () => {
    console.log('Server is running at http://localhost:' + port)
})
