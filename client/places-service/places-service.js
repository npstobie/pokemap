angular.module('app.places-service', [])
.service('PlacesService', function($http, $resource, $location) {

	var key = "";

	var scopeData = {
		idx: 0,
		initialized: false
	};

	scopeData.getLocation = function(coordinates, cb) {
		$http.post('/location', coordinates).success(function(data){
		  	scopeData.places = data;
		  	if (scopeData.places[scopeData.idx].photos) {
		  		obj = {
		    		id: scopeData.places[scopeData.idx].place_id,
		    		ref: scopeData.places[scopeData.idx].photos[0].photo_reference
		    	}
		  	} else {
		  		obj = {
		  		  	id: scopeData.places[scopeData.idx].place_id,
		  		}
		  	}
		    $http.post('/currentLocation', obj)
		      .success(function(data){
		      scopeData.current = formatData(data.result);
		    }).error(function(data){
		      console.log('ERROR invalid request to google place_id', data);
		    })

		    scopeData.idx++;

	    	if (scopeData.places[scopeData.idx].photos) {
	    		obj = {
	      			id: scopeData.places[scopeData.idx].place_id,
	      			ref: scopeData.places[scopeData.idx].photos[0].photo_reference
	      		}
	    	} else {
	    		obj = {
	    		  	id: scopeData.places[scopeData.idx].place_id,
	    		}
	    	}
	      	$http.post('/currentLocation', obj)
	        	.success(function(data){
	       		scopeData.nextPlace = formatData(data.result);
	        	scopeData.idx++;
	        	cb();
	      	}).error(function(data){
	        	console.log('ERROR invalid request to google place_id', data);
	      	})

		}).error(function(data){
		  console.log('ERROR invalid request to google places API');
		})
	}

	scopeData.uninit = function() {
		scopeData.initialized = true;
	}

	scopeData.next = function(cb) {
		scopeData.current = scopeData.nextPlace;
		if (scopeData.places[scopeData.idx].photos) {
			obj = {
	  			id: scopeData.places[scopeData.idx].place_id,
	  			ref: scopeData.places[scopeData.idx].photos[0].photo_reference
	  		}
		} else {
			obj = {
			  	id: scopeData.places[scopeData.idx].place_id,
			}
		}
		$http.post('/currentLocation', obj)
		.success(function(data){
		  scopeData.nextPlace = formatData(data.result);
		  cb(formatData(data.result));
		  scopeData.idx++;
		}).error(function(data){
		  console.log('ERROR invalid request to google place_id', data);
		})
	}

	var formatData = function(obj) {
	  return {
		  image: obj.image_link,
		  name: obj.name,
		  price: obj.rating,
		  address: obj.vicinity
		}
	} 

	scopeData.watcher = function() {
		return scopeData;
	}

	return scopeData;

})
