const Router = require('koa-router');
const create = new Router();
const {packages} = require('../db/models.js')
const {add_user_log} = require('../utils')

create.post('/', async(ctx) => {
    const new_doc = new packages(ctx.request.body)
    await new_doc.save()
    await add_user_log(ctx.state.user.id, ctx.request.body.id, 'create')
    ctx.body = 'success'
})

module.exports = create;
