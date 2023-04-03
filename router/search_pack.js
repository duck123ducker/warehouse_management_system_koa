const Router = require('koa-router');
const search_pack = new Router();
const {packages} = require('../db/models.js')

search_pack.get('/', async(ctx) => {
    const {page, ...params} = ctx.query;
    if (Object.keys(params).length > 0 && page) {
        const PAGE_SIZE = 20;
        const skip = (page - 1) * PAGE_SIZE;
        const match = {};
        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                const regex = new RegExp(params[key]);
                match[key] = { $regex: regex };
            }
        }
        const pipeline = [
            { $match: match },
            { $facet: {
                data: [
                    { $sort: { _id: -1 } },
                    { $skip: skip },
                    { $limit: PAGE_SIZE },
                    { $project: { _id: 0, __v: 0 } }
                ],
                count: [
                    { $count: "total" }
                ]
            }}
        ];
        const [{ count, data }] = await packages.aggregate(pipeline).exec();
        ctx.body = count.length?{
            tableData: data,
            total_num: count[0].total
        }:{
            tableData: [],
            total_num: 0
        }
    }
});

module.exports = search_pack;
