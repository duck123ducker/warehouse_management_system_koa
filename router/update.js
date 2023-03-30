const Router = require('koa-router');
const update = new Router();
const {packages} = require('../db/models.js')

update.post('/', async(ctx) => {
    const {pack_id, method, params} = ctx.request.body
    if(method === 'inbound') {
        const { num } = params
        let result = await packages.findOne({ id: pack_id })
        result.num += Number(num)
        await result.save()
        ctx.body = 'success'
    }
})

module.exports = update;
