const Router = require('koa-router');
const modify_user = new Router();
const {users} = require('../db/models.js')

modify_user.post('/', async(ctx) => {
    const {id, ...params} = ctx.request.body
    await users.findOneAndUpdate(
        { id: id }, params,
        { upsert: true, new: true }
    )
    ctx.body = 'success'
})

module.exports = modify_user;
