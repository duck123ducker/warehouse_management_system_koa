const Router = require('koa-router');
const router = new Router();
const pack = require('./pack')
const update = require('./update')

router.use('/api/pack', pack.routes(), pack.allowedMethods());
router.use('/api/update', update.routes(), update.allowedMethods());
module.exports = router;
