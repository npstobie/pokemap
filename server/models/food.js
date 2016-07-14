var mongoose = require('mongoose');

module.exports = mongoose.model('Food', {
  name: String,
  price: String,
  address: String,
  review: String,
  image: String,
  map: String
}, 'food');


