const{Schema , model } = require('mongoose');

const photoModel = new Schema({
    photo: Buffer,
  });

  module.exports = model("photoModel", photoModel);