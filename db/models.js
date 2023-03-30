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
const packages = mongoose.model('warehouse_packages',packageSchema)
module.exports = {packages}
