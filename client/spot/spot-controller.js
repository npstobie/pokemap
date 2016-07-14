angular.module('app.spot', [])

.controller('spot-controller', function($scope, PlacesService) {
	
	function init () {
		var obj = PlacesService.watcher();
	  $scope.name = obj.current.name;
	  $scope.image = obj.current.image
	  $scope.price = obj.current.price;
	  $scope.address = obj.current.address;	
	  console.log(obj, "THIS")
	}

	init()
})