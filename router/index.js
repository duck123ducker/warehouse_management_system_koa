const Router = require('koa-router');
const router = new Router();
const pack = require('./pack')
const update = require('./update')
const create = require('./create')
const modify = require('./modify')

router.use('/api/pack', pack.routes(), pack.allowedMethods());
router.use('/api/update', update.routes(), update.allowedMethods());
router.use('/api/create', create.routes(), create.allowedMethods());
router.use('/api/modify', modify.routes(), modify.allowedMethods());
module.exports = router;
