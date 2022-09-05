const Router = require('koa-router')
const common = new Router()

// 引入body函数解析器
const bodyparser = require('koa-bodyparser')
common.use(bodyparser())

// 引入数据库查询
const db = require('../../utils/database')

// 引入token生成器
const jwt = require('jsonwebtoken')
const time = require("../../utils/time");

// 登陆接口
common.post('/login', async (ctx) => {
    const account = ctx.request.body.account
    const password = ctx.request.body.password
    const dbData = await new Promise((resolve, reject) => {
        const sql = `select * from user where username = '${account}' and password = '${password}';`
        return db.query(sql, (err, data) => {
            if (err) throw err
            resolve(data)
        })
    })
    let code = 1;
    let data = {};
    let msg = '';
    if (dbData.length === 0) {
        code = 0
        msg = '用户名或密码错误'
    } else {
        code = 1
        msg = '登陆成功'
        const token = jwt.sign({
            id: dbData[0].id,
            username: dbData[0].username,
        }, 'secret', {
            expiresIn: 86400
        })
        data = {
            token
        }
        // 添加日志
        await new Promise((resolve, reject) => {
            const sql = `insert into log set handle='登陆', time='${time.formatTime(new Date())}', user_id=${dbData[0].id};`
            return db.query(sql, (err, data) => {
                if (err) throw err
                resolve(data)
            })
        })
    }
    ctx.body = {
        code: code,
        data: data,
        msg: msg
    }
})

// 注册接口
common.post('/register', async (ctx) => {
    const account = ctx.request.body.account
    const password = ctx.request.body.password
    const username = ctx.request.body.username
    const dbData = await new Promise((resolve, reject) => {
        const sql = `select * from user where username = '${account}';`
        return db.query(sql, (err, data) => {
            if (err) throw err
            resolve(data)
        })
    })
    let code = 1;
    let data = {};
    let msg = '';
    if (dbData.length > 0) {
        code = 0
        msg = '账号已存在'
    } else {
        const updateFlag = await new Promise((resolve, reject) => {
            const sql = `insert into user (username, password,name) value ('${account}', '${password}', '${username}');`
            return db.query(sql, (err, data) => {
                if (err) throw err
                resolve(data)
            })
        })
        if (updateFlag.affectedRows > 0) {
            code = 1
            msg = '注册成功'
        } else {
            code = 0
            msg = '注册失败'
        }
    }
    ctx.body = {
        code: code,
        data: data,
        msg: msg
    }
})

module.exports = common