const Router = require('koa-router');
const modify = new Router();
const {packages} = require('../db/models.js')

modify.post('/', async(ctx) => {
    const {id} = ctx.request.body
    let result = await packages.findOne({ id: id })
    Object.assign(result, ctx.request.body)
    await result.save()
    ctx.body = 'success'
})

module.exports = modify;
