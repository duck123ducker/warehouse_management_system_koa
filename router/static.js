const Router = require('koa-router');
const static_ = new Router();
const {packages,users} = require('../db/models.js')

static_.get('/', async(ctx) => {
    const pack_count = await packages.countDocuments().exec()
    const user_count = await users.countDocuments().exec()
    ctx.body = {
        pack_num: pack_count,
        user_num: user_count
    }
})

module.exports = static_;
