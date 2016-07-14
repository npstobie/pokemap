var Food = require('../models/food.js');

module.exports.list = function (req, res) {
  Food.find({}, function (err, results){
    res.json(results);
  })
}
