const Router = require('koa-router');
const create = new Router();
const {packages} = require('../db/models.js')

create.post('/', async(ctx) => {
    const new_doc = new packages(ctx.request.body)
    await new_doc.save()
    ctx.body = 'success'
})

module.exports = create;
