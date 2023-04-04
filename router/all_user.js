const Router = require('koa-router');
const all_user = new Router();
const {users} = require('../db/models.js')

all_user.get('/', async(ctx) => {
    const page = Number(ctx.query.page)
    if(page) {
        const PAGE_SIZE = 20;
        const skip = (page - 1) * PAGE_SIZE;
        ctx.body = await users.find()
            .sort({_id: -1}) // 按照_id倒序排列
            .skip(skip)
            .limit(PAGE_SIZE)
            .select("-_id -__v -passwd -access_log")
            .exec()
    }
})

module.exports = all_user;
