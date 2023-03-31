const Router = require('koa-router');
const pack = new Router();
const {packages} = require('../db/models.js')

pack.get('/', async(ctx) => {
    const package_id = ctx.query.package_id
    if(ctx.query.package_id) {
        let result = await packages.findOne({ id: package_id },{'_id': 0})
        if(!!result) {
            ctx.body = result
        }
    }
})

module.exports = pack;
