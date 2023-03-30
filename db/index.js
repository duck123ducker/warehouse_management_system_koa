const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
const mongoConnect = async () => {
    await mongoose.connect('mongodb://', { useNewUrlParser: true }).then(() => {
        console.log('数据库连接成功')
    }).catch(err => {
        console.log('数据库连接失败', err)
    })
}

module.exports = mongoConnect
