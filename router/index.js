const Router = require('koa-router');
const router = new Router();
const pack = require('./pack')
const update = require('./update')
const create = require('./create')
const modify = require('./modify')
const all_pack = require('./all_pack')
const search_pack = require('./search_pack')
const static_ = require('./static')
const login = require('./login')
const modify_user = require('./modify_user')
const all_user = require('./all_user')

router.use('/api/pack', pack.routes(), pack.allowedMethods());
router.use('/api/update', update.routes(), update.allowedMethods());
router.use('/api/create', create.routes(), create.allowedMethods());
router.use('/api/modify', modify.routes(), modify.allowedMethods());
router.use('/api/all_pack', all_pack.routes(), all_pack.allowedMethods());
router.use('/api/search_pack', search_pack.routes(), search_pack.allowedMethods());
router.use('/api/static', static_.routes(), static_.allowedMethods());
router.use('/api/login', login.routes(), login.allowedMethods());
router.use('/api/modify_user', modify_user.routes(), modify_user.allowedMethods());
router.use('/api/all_user', all_user.routes(), all_user.allowedMethods());
module.exports = router;
