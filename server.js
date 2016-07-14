var express = require('express'),
	  dotenv = require('dotenv').config(),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    port = 3000,
    foodController = require('./server/controllers/food-controller.js'),
    placesController = require('./server/controllers/places-search.js');


app.use(bodyParser.json());

app.use(express.static(__dirname + '/client'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

app.get('/api/food', foodController.list);

app.post('/location', placesController.find);

app.post('/currentLocation', placesController.details);

app.listen(port, function() {
  console.log('Listening on port ' + port);
});