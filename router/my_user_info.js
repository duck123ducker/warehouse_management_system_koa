const Router = require('koa-router');
const my_user_info = new Router();
const {users} = require('../db/models.js')

my_user_info.get('/', async(ctx) => {
    const id = ctx.state.user.id
    ctx.body = await users.findOne({id: id}, {'_id': 0, '__v':0, 'access_log': 0, 'passwd': 0})
})

module.exports = my_user_info;
