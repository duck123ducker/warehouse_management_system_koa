const Koa = require('koa2');
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const port = 3001;
const mongoConnect = require('./db')
mongoConnect()

const router = require('./router/index')
app.use( async (ctx, next) => {
    await next();
    if (parseInt(ctx.status) === 404) {
        ctx.body = ''
    }
});
app.use(cors());
app.use(bodyParser());
app.use(router.routes(), router.allowedMethods());

app.listen(port, ()=>{
    console.log('Server is running at http://localhost:'+port);
})
