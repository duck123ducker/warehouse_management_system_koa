const Router = require('koa-router');
const all_pack = new Router();
const { packages } = require('../db/models.js');

all_pack.get('/', async(ctx) => {
    const page = Number(ctx.query.page);
    if (page) {
        const PAGE_SIZE = 20;
        const skip = (page - 1) * PAGE_SIZE;
        const pipeline = [
            {
                $facet: {
                    metadata: [{ $count: "total_num" }],
                    tableData: [
                        { $sort: { _id: -1 } },
                        { $skip: skip },
                        { $limit: PAGE_SIZE },
                        { $project: { _id: 0, __v: 0, access_log: 0 } }
                    ]
                }
            }
        ];
        const result = await packages.aggregate(pipeline).exec();
        ctx.body = {
            total_num: result[0].metadata[0].total_num,
            tableData: result[0].tableData
        }
    }
});

module.exports = all_pack;
