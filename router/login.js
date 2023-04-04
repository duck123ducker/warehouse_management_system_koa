const jwt = require('jsonwebtoken')
const Router = require('koa-router')
const login = new Router();
const {users} = require('../db/models.js')
const secret = 'duckDuckers'

login.post('/', async (ctx) => {
    const {id, passwd} = ctx.request.body
    let result = await users.findOne({ id: id, passwd: passwd })
    if(!!result) {
        // 如果身份验证成功，则签发一个JWT令牌
        const payload = {
            id: id,
            role: result.role
        };
        const token = jwt.sign(payload, secret, { expiresIn: '7d' }); // 有效期为7天
        ctx.body = {
            code: 200,
            message: '登录成功',
            data: {
                token: token
            }
        };
    } else {
        ctx.body = {
            code: 401,
            message: '用户名或密码错误'
        };
    }
});
module.exports = login;
