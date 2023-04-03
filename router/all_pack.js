const Router = require('koa-router');
const all_pack = new Router();
const {packages} = require('../db/models.js')

all_pack.get('/', async(ctx) => {
    const page = Number(ctx.query.page)
    if(page) {
        const PAGE_SIZE = 20;
        const skip = (page - 1) * PAGE_SIZE;
        ctx.body = await packages.find()
            .sort({_id: -1}) // 按照_id倒序排列
            .skip(skip)
            .limit(PAGE_SIZE)
            .select("-_id -__v")
            .exec()
    }
})

module.exports = all_pack;
