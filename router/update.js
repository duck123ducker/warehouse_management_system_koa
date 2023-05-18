const Router = require('koa-router');
const update = new Router();
const {packages, logs} = require('../db/models.js')
const {add_user_log} = require("../utils/index")

update.post('/', async(ctx) => {
    const {pack_id, method, params} = ctx.request.body
    const { num } = params
    let result = await packages.findOne({ id: pack_id })
    if(method === 'inbound') {
        result.num += Number(num)
    }else if(method === 'outbound') {
        result.num -= Number(num)
    }
    await result.save()
    await add_user_log(ctx.state.user.id, pack_id, method)
    const log = await logs.findOne({date: new Date().toLocaleDateString()})
    if(log) {
        if(method === 'inbound') {
            log.inbound+=num
        }else if(method === 'outbound') {
            log.outbound+=num
        }
        await log.save()
    }else {
        const newLog = new logs({
            date: new Date().toLocaleDateString(),
            inbound: method === 'inbound' ? 1 : 0,
            outbound: method === 'outbound' ? 1 : 0
        })
        await newLog.save()
    }
    ctx.body = 'success'
})

module.exports = update;
