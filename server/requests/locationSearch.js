var request = require('request');
var urlExpander=require('expand-url');
var key = process.env.GOOGLE_KEY

module.exports = {
  search: search,
  detailSearch: detailSearch
};

function search(lat, lon, callback) {
  var query = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + lon + '&radius=1000&types=restaurant&key=' + key;
  request(query, function(err, res, body){
    if (err) {
      console.log(err);
    } else {
      callback(JSON.parse(res.body).results);
    }
  })
}

function detailSearch(id, callback) {
  var query = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + id + '&key=' + key;
  request(query, function(err, res, body){
    if (err) {
      console.log(err);
    } else {
      callback(JSON.parse(body))
    }
  })
}

// function photoSearch(ref, callback) {
//   var query = "https://maps.googleapis.com/maps/api/place/photo?photoreference=" + ref + "&sensor=false&maxwidth=800&key=" + key;
//   request(query, function(err, res, body){
//     if (err) {
//       console.log(err);
//     } else {
//       callback(JSON.parse(body))
//     }
//   })
// }

// https://maps.googleapis.com/maps/api/place/photo?photoreference=CmRdAAAAA7kVHJ7dE8xXVBa2mbrk0RvEx5vEXVxuVKUox9VCtzfniukGvFogr6jXbWvK63y6dsPKZUWnhm5pD_Avy60RNxeYMVE61iPxLPo2cL8iz8Ha7VJh_yGvB1IXuKbr9hjnEhDGl9iPMay_rJ-0m96IIZu7GhRUHNqyNSJjhKi34tLuTYtA5gQDXA&sensor=false&maxheight=1200&maxwidth=800&key=AIzaSyBwa_30IwZd8X4DZ_-eeX5YP2YuypkXqx8
// https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAiT0mQO4v8d7DQ36A8a5zgqd8bemF-tWr2KTfAdCUFJ4eTYb6Kdt5lmfAFMu3DmkKM0UaizD0rp3gHe65AouBBGJ6-p4yRkYnLpST3f924JNu81wgmxMcNHzhmMU4jGpvEhC1TxtVzH6ABTFu2UAkGlenGhQhurC43m0e-pV2XcIECbK5nTCOGg&sensor=false&key=AIzaSyBwa_30IwZd8X4DZ_-eeX5YP2YuypkXqx8
