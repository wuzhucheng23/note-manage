const Router = require('koa-router')
const db = require("../../utils/database");
const time = require('../../utils/time')
const client = new Router()
const jwt = require("jsonwebtoken");

// 笔记详情接口
client.get('/getNoteDetail', async (ctx) => {
    const token = ctx.request.headers.authorization
    const userInfo = jwt.verify(token, 'secret')
    const id = ctx.request.query.id
    const type = ctx.request.query.type
    const articleData = await new Promise((resolve, reject) => {
        const sql = `select * from article where id = ${id};`
        return db.query(sql, (err, data) => {
            if (err) throw err
            resolve(data)
        })
    })
    if (type) {
        // 增加文章阅读量
        await new Promise((resolve, reject) => {
            const sql = `update article set read_volume=read_volume+1 where id = ${id};`
            return db.query(sql, (err, data) => {
                if (err) throw err
                resolve(data)
            })
        })
        // 增加日期阅读量
        const date = time.formatTime(new Date()).split(' ')[0]
        const pvData = await new Promise((resolve, reject) => {
            const sql = `select * from pv where time='${date}' and user_id=${userInfo.id}`
            return db.query(sql, (err, data) => {
                if (err) throw err
                resolve(data)
            })
        })
        if (pvData.length === 0) {
            await new Promise((resolve, reject) => {
                const sql = `insert into pv set time='${date}', read_volume=1, user_id=${userInfo.id};`
                return db.query(sql, (err, data) => {
                    if (err) throw err
                    resolve(data)
                })
            })
        } else {
            await new Promise((resolve, reject) => {
                const sql = `update pv set read_volume=read_volume+1 where time='${date}' and user_id=${userInfo.id};`
                return db.query(sql, (err, data) => {
                    if (err) throw err
                    resolve(data)
                })
            })
        }
    }
    ctx.body = {
        code: 1,
        data: {
            notes: articleData[0],
        },
        msg: '请求成功'
    }
})

module.exports = client