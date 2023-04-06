const Router = require('koa-router');
const update = new Router();
const {packages} = require('../db/models.js')

update.post('/', async(ctx) => {
    const {pack_id, method, params} = ctx.request.body
    const { num } = params
    let result = await packages.findOne({ id: pack_id })
    if(method === 'inbound') {
        result.num += Number(num)
    }else if(method === 'outbound') {
        result.num -= Number(num)
    }
    result.access_log.unshift({
        user: ctx.state.user.id,
        operation: method,
        date: (Date.parse(new Date())/1000).toString(),
    })
    await result.save()
    ctx.body = 'success'
})

module.exports = update;
