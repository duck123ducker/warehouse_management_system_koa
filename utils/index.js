const {users} = require('../db/models.js')
async function access(id, path) {
    const result = await users.findOne({id: id})
    const role = result.role
    if (role === 'root') return true
    else {
        const access_control = {
            '/api/pack': ['read', 'write', 'create'],
            '/api/update': ['write', 'create'],
            '/api/create': ['create'],
            '/api/modify': ['write', 'create'],
            '/api/all_pack': [],
            '/api/search_pack': [],
            '/api/static': [],
            '/api/modify_user': [],
            '/api/all_user': []
        }
        return !!access_control[path].includes(role);
    }
}

const utils = {access}
module.exports = utils
