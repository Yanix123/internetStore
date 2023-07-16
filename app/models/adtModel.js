const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const adtSchema = new mongoose.Schema({
  adtHeader: {
    type: String,
    required: true
  },
  adtPhoto: {
    type: String
  },
  adtDes: {
    type: String,
    required: true
  }
});

adtSchema.plugin(mongoosePaginate);

const adtModel = mongoose.model('adt', adtSchema);

module.exports = adtModel;