const Router = require('koa-router')
const server = new Router()

// 引入工具函数
const db = require("../../utils/database");
const time = require("../../utils/time");

// 引入body函数解析器
const bodyparser = require('koa-bodyparser')
server.use(bodyparser())

// 引入token解析器
const jwt = require("jsonwebtoken");

// 首页统计数据接口
server.get('/personInfo', async (ctx) => {
    const token = ctx.request.headers.authorization
    const userInfo = jwt.verify(token, 'secret')
    const articleData = await new Promise((resolve, reject) => {
        const sql = `select * from article where user_id=${userInfo.id};`
        return db.query(sql, (err, data) => {
            if (err) throw err
            resolve(data)
        })
    })
    const categoryData = await new Promise((resolve, reject) => {
        const sql = `select * from category where user_id=${userInfo.id};`
        return db.query(sql, (err, data) => {
            if (err) throw err
            resolve(data)
        })
    })
    const readVolumnData = await new Promise((resolve, reject) => {
        const sql = `select * from pv where user_id=${userInfo.id} order by id desc limit 7`
        return db.query(sql, (err, data) => {
            if (err) throw err
            resolve(data)
        })
    })
    let readNumber = 0
    articleData.forEach(item => readNumber += item.read_volume)
    ctx.body = {
        code: 1,
        data: {
            read_number: readNumber,
            notes_number: articleData.length,
            category_number: categoryData.length,
            readList: readVolumnData.reverse()
        },
        msg: '请求成功'
    }
})

// 笔记分页列表接口
server.get('/getNotes', async (ctx) => {
    const token = ctx.request.headers.authorization
    const userInfo = jwt.verify(token, 'secret')
    const page = ctx.request.query.page
    const size = ctx.request.query.size
    const category = ctx.request.query.category
    const articleData = await new Promise((resolve, reject) => {
        let sql = `select * from article where user_id=${userInfo.id};`
        if (category) sql = `select * from article where category_id = ${category} and user_id=${userInfo.id};`
        return db.query(sql, (err, data) => {
            if (err) throw err
            resolve(data)
        })
    })
    const articlePageData = await new Promise((resolve, reject) => {
        let sql = `select * from article where user_id=${userInfo.id} limit ${(page - 1) * size},${size};`
        if (category) sql = `select * from article where category_id = ${category} and user_id=${userInfo.id} limit ${(page - 1) * size},${size};`
        return db.query(sql, (err, data) => {
            if (err) throw err
            resolve(data)
        })
    })
    ctx.body = {
        code: 1,
        data: {
            notesList: articlePageData,
            total: articleData.length
        },
        msg: '请求成功'
    }
})

// 添加笔记接口
server.post('/addNotes', async (ctx) => {
    const token = ctx.request.headers.authorization
    const userInfo = jwt.verify(token, 'secret')
    const title = ctx.request.body.title
    const introduction = ctx.request.body.introduction
    const category = ctx.request.body.category
    const content = ctx.request.body.content
    let code = 1;
    let data = {};
    let msg = '';
    const dbData = await new Promise((resolve, reject) => {
        const sql = `insert into article set title='${title}', introduction='${introduction}', content='${content}', time='${time.formatTime(new Date())}', category_id=${category}, user_id=${userInfo.id};`
        return db.query(sql, (err, data) => {
            if (err) throw err
            resolve(data)
        })
    })
    if (dbData.affectedRows > 0) {
        // 添加日志
        await new Promise((resolve, reject) => {
            const sql = `insert into log set handle='添加笔记', time='${time.formatTime(new Date())}', user_id=${userInfo.id};`
            return db.query(sql, (err, data) => {
                if (err) throw err
                resolve(data)
            })
        })
        code = 1
        msg = '添加成功'
    } else {
        code = 0
        msg = '添加失败'
    }
    ctx.body = {
        code: code,
        data: data,
        msg: msg
    }
})

// 编辑笔记接口
server.post('/editNotes', async (ctx) => {
    const token = ctx.request.headers.authorization
    const userInfo = jwt.verify(token, 'secret')
    const id = ctx.request.body.id
    const title = ctx.request.body.title
    const introduction = ctx.request.body.introduction
    const category = ctx.request.body.category
    const content = ctx.request.body.content
    let code = 1;
    let data = {};
    let msg = '';
    const dbData = await new Promise((resolve, reject) => {
        const sql = `update article set title='${title}', introduction='${introduction}', content='${content}', time='${time.formatTime(new Date())}', category_id=${category} where id=${id};`
        return db.query(sql, (err, data) => {
            if (err) throw err
            resolve(data)
        })
    })
    if (dbData.affectedRows > 0) {
        // 添加日志
        await new Promise((resolve, reject) => {
            const sql = `insert into log set handle='编辑笔记', time='${time.formatTime(new Date())}', user_id=${userInfo.id};`
            return db.query(sql, (err, data) => {
                if (err) throw err
                resolve(data)
            })
        })
        code = 1
        msg = '编辑成功'
    } else {
        code = 0
        msg = '编辑失败'
    }
    ctx.body = {
        code: code,
        data: data,
        msg: msg
    }
})

// 删除笔记接口
server.post('/deltNotes', async (ctx) => {
    const token = ctx.request.headers.authorization
    const userInfo = jwt.verify(token, 'secret')
    const id = ctx.request.body.id
    let code = 1;
    let data = {};
    let msg = '';
    const dbData = await new Promise((resolve, reject) => {
        const sql = `delete from article where id=${id};`
        return db.query(sql, (err, data) => {
            if (err) throw err
            resolve(data)
        })
    })
    if (dbData.affectedRows > 0) {
        // 添加日志
        await new Promise((resolve, reject) => {
            const sql = `insert into log set handle='删除笔记', time='${time.formatTime(new Date())}', user_id=${userInfo.id};`
            return db.query(sql, (err, data) => {
                if (err) throw err
                resolve(data)
            })
        })
        code = 1
        msg = '删除成功'
    } else {
        code = 0
        msg = '删除失败'
    }
    ctx.body = {
        code: code,
        data: data,
        msg: msg
    }
})

// 类目分页列表接口
server.get('/getCategory', async (ctx) => {
    const token = ctx.request.headers.authorization
    const userInfo = jwt.verify(token, 'secret')
    const page = ctx.request.query.page
    const size = ctx.request.query.size
    const categoryData = await new Promise((resolve, reject) => {
        const sql = `select * from category where user_id=${userInfo.id};`
        return db.query(sql, (err, data) => {
            if (err) throw err
            resolve(data)
        })
    })
    const categoryPageData = await new Promise((resolve, reject) => {
        let sql = `select * from category where user_id=${userInfo.id}  limit ${(page - 1) * size},${size};`
        return db.query(sql, (err, data) => {
            if (err) throw err
            resolve(data)
        })
    })
    ctx.body = {
        code: 1,
        data: {
            categoryList: categoryPageData.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    index: item.sort
                }
            }),
            total: categoryData.length
        },
        msg: '请求成功'
    }
})

// 所有类目接口
server.get('/getCategoryList', async (ctx) => {

    const token = ctx.request.headers.authorization
    const userInfo = jwt.verify(token, 'secret')
    const categoryData = await new Promise((resolve, reject) => {
        const sql = `select * from category where user_id=${userInfo.id};`
        return db.query(sql, (err, data) => {
            if (err) throw err
            resolve(data)
        })
    })
    ctx.body = {
        code: 1,
        data: {
            categoryList: categoryData.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    index: item.sort
                }
            })
        },
        msg: '请求成功'
    }
})

// 类目详情接口
server.get('/getCategoryDetail', async (ctx) => {
    const id = ctx.request.query.id
    const categoryData = await new Promise((resolve, reject) => {
        const sql = `select * from category where id = ${id};`
        return db.query(sql, (err, data) => {
            if (err) throw err
            resolve(data)
        })
    })
    ctx.body = {
        code: 1,
        data: {
            category: {
                id: categoryData[0].id,
                name: categoryData[0].name,
                index: categoryData[0].sort,
            },
        },
        msg: '请求成功'
    }
})

// 添加类目接口
server.post('/addCategory', async (ctx) => {
    const token = ctx.request.headers.authorization
    const userInfo = jwt.verify(token, 'secret')
    const name = ctx.request.body.name
    const index = ctx.request.body.index
    let code = 1;
    let data = {};
    let msg = '';
    const dbData = await new Promise((resolve, reject) => {
        const sql = `insert into category set name='${name}', sort=${index}, user_id=${userInfo.id};`
        return db.query(sql, (err, data) => {
            if (err) throw err
            resolve(data)
        })
    })
    if (dbData.affectedRows > 0) {
        // 添加日志
        await new Promise((resolve, reject) => {
            const sql = `insert into log set handle='添加类目', time='${time.formatTime(new Date())}', user_id=${userInfo.id};`
            return db.query(sql, (err, data) => {
                if (err) throw err
                resolve(data)
            })
        })
        code = 1
        msg = '添加成功'
    } else {
        code = 0
        msg = '添加失败'
    }
    ctx.body = {
        code: code,
        data: data,
        msg: msg
    }
})

// 编辑类目接口
server.post('/editCategory', async (ctx) => {
    const token = ctx.request.headers.authorization
    const userInfo = jwt.verify(token, 'secret')
    const id = ctx.request.body.id
    const name = ctx.request.body.name
    const index = ctx.request.body.index
    let code = 1;
    let data = {};
    let msg = '';
    const dbData = await new Promise((resolve, reject) => {
        const sql = `update category set name='${name}', sort=${index} where id=${id};`
        return db.query(sql, (err, data) => {
            if (err) throw err
            resolve(data)
        })
    })
    if (dbData.affectedRows > 0) {
        // 添加日志
        await new Promise((resolve, reject) => {
            const sql = `insert into log set handle='编辑类目', time='${time.formatTime(new Date())}', user_id=${userInfo.id};`
            return db.query(sql, (err, data) => {
                if (err) throw err
                resolve(data)
            })
        })
        code = 1
        msg = '编辑成功'
    } else {
        code = 0
        msg = '编辑失败'
    }
    ctx.body = {
        code: code,
        data: data,
        msg: msg
    }
})

// 删除类目接口
server.post('/delCategory', async (ctx) => {
    const token = ctx.request.headers.authorization
    const userInfo = jwt.verify(token, 'secret')
    const id = ctx.request.body.id
    let code = 1;
    let data = {};
    let msg = '';
    const dbData = await new Promise((resolve, reject) => {
        const sql = `delete from category where id=${id};`
        return db.query(sql, (err, data) => {
            if (err) throw err
            resolve(data)
        })
    })
    if (dbData.affectedRows > 0) {
        // 添加日志
        await new Promise((resolve, reject) => {
            const sql = `insert into log set handle='删除类目', time='${time.formatTime(new Date())}', user_id=${userInfo.id};`
            return db.query(sql, (err, data) => {
                if (err) throw err
                resolve(data)
            })
        })
        code = 1
        msg = '删除成功'
    } else {
        code = 0
        msg = '删除失败'
    }
    ctx.body = {
        code: code,
        data: data,
        msg: msg
    }
})

// 日志列表接口
server.get('/getLogs', async (ctx) => {
    const token = ctx.request.headers.authorization
    const userInfo = jwt.verify(token, 'secret')
    const page = ctx.request.query.page
    const size = ctx.request.query.size
    const logData = await new Promise((resolve, reject) => {
        const sql = `select * from log where user_id=${userInfo.id};`
        return db.query(sql, (err, data) => {
            if (err) throw err
            resolve(data)
        })
    })
    const logPageData = await new Promise((resolve, reject) => {
        let sql = `select * from log where user_id=${userInfo.id} limit ${(page - 1) * size},${size};`
        return db.query(sql, (err, data) => {
            if (err) throw err
            resolve(data)
        })
    })
    ctx.body = {
        code: 1,
        data: {
            logList: logPageData,
            total: logData.length
        },
        msg: '请求成功'
    }
})

// 用户信息接口
server.get('/getUser', async (ctx) => {
    const token = ctx.request.headers.authorization
    const userInfo = jwt.verify(token, 'secret')
    const userData = await new Promise((resolve, reject) => {
        let sql = `select * from user where id=${userInfo.id};`
        return db.query(sql, (err, data) => {
            if (err) throw err
            resolve(data)
        })
    })
    ctx.body = {
        code: 1,
        data: {
            account: userData[0].username,
            password: userData[0].password,
            username: userData[0].name,
        },
        msg: '请求成功'
    }
})

// 编辑用户信息接口
server.post('/editUser', async (ctx) => {
    const token = ctx.request.headers.authorization
    const userInfo = jwt.verify(token, 'secret')
    const password = ctx.request.body.password
    const name = ctx.request.body.name
    let code = 1;
    let data = {};
    let msg = '';
    const dbData = await new Promise((resolve, reject) => {
        const sql = `update user set password='${password}', name='${name}' where id=${userInfo.id};`
        return db.query(sql, (err, data) => {
            if (err) throw err
            resolve(data)
        })
    })
    if (dbData.affectedRows > 0) {
        // 添加日志
        await new Promise((resolve, reject) => {
            const sql = `insert into log set handle='修改个人信息', time='${time.formatTime(new Date())}', user_id=${userInfo.id};`
            return db.query(sql, (err, data) => {
                if (err) throw err
                resolve(data)
            })
        })
        code = 1
        msg = '保存成功'
    } else {
        code = 0
        msg = '保存失败'
    }
    ctx.body = {
        code: code,
        data: data,
        msg: msg
    }
})

module.exports = server