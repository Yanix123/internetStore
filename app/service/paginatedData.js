const adtModel = require('../models/adtModel');
const { paginate } = require('mongoose-paginate-v2');

async function paginateData(req, res, next) {
  try {
    const page = req.query.page || 1;
    const limit = 20;

    const options = {
      page,
      limit
    };

    const paginatedData = await adtModel.paginate({}, options);
    return paginatedData;
  } catch (error) {
    console.log(error)
     return res.status(500).send()
  }
}

module.exports = { paginateData };
