const fs = require('fs')
const path = require('path')

const readFile = (filePath) => {
    fs.readFile(path.join(__dirname, filePath), (err, data) => {
        if (err) throw err
        console.log(data)
    })
}