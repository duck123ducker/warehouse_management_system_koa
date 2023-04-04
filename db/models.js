const mongoose =require('mongoose')

const packageSchema = new mongoose.Schema({
    id: String,
    num: Number,
    name: String,
    access_log: [
        {
            _id: false,
            user: String,
            operation: String,
            date: String,
        }
    ],
})
const userSchema = new mongoose.Schema({
    id: String,
    passwd: String,
    nick_name: String,
    role: String, //none, read, write, create, root
    access_log: [
        {
            _id: false,
            package: String,
            operation: String,
            date: String,
        }
    ],
})
const packages = mongoose.model('warehouse_packages',packageSchema)
const users = mongoose.model('warehouse_users',userSchema)
module.exports = {packages, users}
