const mysql = require('mysql')

const pool = mysql.createPool({
    host: '8.134.93.71',
    port: 3306,
    database: 'blog',
    user: 'root',
    password: '5201314wzc'
})

const query = (sql, callback) => {
    pool.getConnection((err, connection) => {
        connection.query(sql, (err, rows) => {
            callback(err, rows)
            connection.release()
        })
    })
}

module.exports = {
    query
}
