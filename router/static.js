const Router = require('koa-router');
const static_ = new Router();
const {packages} = require('../db/models.js')

static_.get('/', async(ctx) => {
    const count = await packages.countDocuments().exec()
    ctx.body = {
        total_num: count
    }
})

module.exports = static_;
