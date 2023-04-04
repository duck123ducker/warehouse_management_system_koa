const Koa = require('koa2');
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser');
const koaJwt = require('koa-jwt')
const {access} = require("./utils/index");
const app = new Koa();
const port = 3001;
const mongoConnect = require('./db')
mongoConnect()

const router = require('./router/index')
app.use(async (ctx, next) => {
    try {
        await next();
        if (parseInt(ctx.status) === 404) {
            ctx.body = '';
        }
    } catch (err) {
        if (parseInt(err.status) === 401) {
            ctx.status = 200;
            ctx.body = 'expired';
        } else {
            console.log(err)
            // throw err;
        }
    }
});

app.use(cors());
app.use(bodyParser());
app.use(koaJwt({ secret: 'duckDuckers' }).unless({path: [/^\/api\/login/]}))
app.use(async (ctx, next) => {
    if(ctx.request.path === '/api/login') await next()
    else if (await access(ctx.state.user.id, ctx.request.path)) await next()
    else ctx.body = 'no permission'
})
app.use(router.routes(), router.allowedMethods());

app.listen(port, ()=>{
    console.log('Server is running at http://localhost:'+port);
})
