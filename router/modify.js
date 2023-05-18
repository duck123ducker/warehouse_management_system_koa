const Router = require('koa-router');
const modify = new Router();
const {packages} = require('../db/models.js')
const {add_user_log} = require('../utils')

modify.post('/', async(ctx) => {
    const {id} = ctx.request.body
    let result = await packages.findOne({ id: id })
    delete ctx.request.body.access_log
    Object.assign(result, ctx.request.body)
    await result.save()
    await add_user_log(ctx.state.user.id, id, 'modify')
    ctx.body = 'success'
})

module.exports = modify;
