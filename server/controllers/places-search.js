var locationSearch = require('../requests/locationSearch.js');
var key = process.env.GOOGLE_KEY;
var urlExpander=require('expand-url');


module.exports = {
  find: find,
  details: details
};

function find(req, res) {
  locationSearch.search(req.body.lat, req.body.lon, function(data) {
    res.send(data);
  });
}

function details(req, res) {
  locationSearch.detailSearch(req.body.id, function(data){
    console.log(data.result.address_components);
    var obj = data;
    if (req.body.ref) {
      urlExpander.expand("https://maps.googleapis.com/maps/api/place/photo?photoreference=" + req.body.ref + "&sensor=false&maxwidth=800&key=" + key, function(err, url) {
        obj.result.image_link = url;
        res.send(obj);
      });
    } else {
      obj.result.image_link = "http://www.aspneter.com/aspneter/wp-content/uploads/2016/01/no-thumb.jpg";
      res.send(obj);
    }
  });
}