// 引入路由
const Router = require('koa-router')
const router = new Router()

// 路由重定向
router.redirect('/', '/api/common')

// 公用路由
const common = require('./common/index')
router.use('/api/common', common.routes(), common.allowedMethods())

// token访问认证
const db = require('../utils/database')
const jwt = require('jsonwebtoken')

// 用户登陆状态验证
router.use(async (ctx, next) => {
    let code = 1
    let data = {}
    let msg = ''
    if (ctx.request.path.indexOf('/api/common') > -1) return await next();
    const token = ctx.request.headers.authorization
    if (!token) {
        code = 500
        msg = '身份验证不通过'
    } else {
        try {
            const userInfo = jwt.verify(token, 'secret')
            const dbData = await new Promise((resolve, reject) => {
                const sql = `select * from user where id = '${userInfo.id}' and username = '${userInfo.username}';`
                return db.query(sql, (err, data) => {
                    if (err) throw err
                    resolve(data)
                })
            })
            code = 1
            msg = '验证通过'
        } catch (e) {
            code = 500
            msg = '身份验证已过期，请重新登陆'
        }
    }
    if (code === 500) {
        ctx.body = {
            code: code,
            data: data,
            msg: msg
        }
    } else {
        await next()
    }
})

// 管理模式路由
const client = require('./client/index')
router.use('/api/client', client.routes(), client.allowedMethods())

// 阅读模式路由
const server = require('./server/index')
router.use('/api/server', server.routes(), server.allowedMethods())

// 导出路由
module.exports = router