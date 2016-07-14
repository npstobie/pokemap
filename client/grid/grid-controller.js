angular.module('app.grid', [])

.controller('grid-controller', function($scope, $location, $timeout, PlacesService) {

	$scope.change = true;

	$scope.describe = function() {
		$location
	}
	
	$scope.coordinates = {
		lon: geoplugin_longitude(), 
		lat: geoplugin_latitude()
	};

	$scope.swipeLeft = function() {
		$("#buddy1").trigger('swipeleft')
	}

	$scope.swipeRight = function() {
		$("#buddy1").trigger('swiperight');
		$timeout(function(){$location.url('/spot');},700)
	}

	$scope.swipeLeft2 = function() {
		$("#buddy2").trigger('swipeleft')
	}

	$scope.swipeRight2 = function() {
		$("#buddy2").trigger('swiperight');
		$timeout(function(){$location.url('/spot');},700)
	}

	$scope.swipeRight3 = function() {
		$timeout(function(){$location.url('/spot');},700)
	}

	$scope.next = function() {
		PlacesService.next(function(obj){
			if ($scope.change === true) {
				$timeout(function(){
				  $scope.name = obj.name;
				  $scope.image = obj.image
				  $scope.nextImage = obj.image;
			    $scope.price = obj.price;
			    $scope.address = obj.address;
			    $scope.change = false;	
				}, 700)
			} else {
				$timeout(function(){
					$scope.name2 = obj.name;
					$scope.image2 = obj.image
					$scope.nextImage2 = obj.image;
					$scope.price2 = obj.price;
					$scope.address2 = obj.address;
					$scope.change = true;
				},700)
			}
		});
	}

	$scope.current = function() {

	}


	$scope.data = function(){
		var stuff = PlacesService.watcher();
		if(!stuff.initialized) {
			PlacesService.uninit();
			PlacesService.getLocation($scope.coordinates, function(){
				$timeout(function(){ init() },100)
			});
		} else {
			init();
		}
	}

	$scope.data()


	function init(){
		var stuff = PlacesService.watcher();
		$scope.name = stuff.current.name;
		$scope.image = stuff.current.image
		$scope.price = stuff.current.price;
		$scope.address = stuff.current.address;
		$scope.name2 = stuff.nextPlace.name;
		$scope.image2 = stuff.nextPlace.image
		$scope.price2 = stuff.nextPlace.price;
		$scope.address2 = stuff.nextPlace.address;
	}


	//JS for tinder cards
	$(document).ready(function(){
    $("#buddy1").on("swiperight",function(){
      $(this).addClass('rotate-left').delay(700).fadeOut(1);
      $('#buddy1').find('.status').remove();
			$timeout($scope.swipeRight3,100)
    });  

    $("#buddy1").on("swipeleft",function(){
	    $(this).addClass('rotate-right').delay(700).fadeOut(1);
	    $scope.next();
	    $('#buddy1').find('.status').remove();
	    if ( $(this).is(':last-child') ) {
	     $('.buddy:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
	     } else {
	        $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
	    } 
  	});

    $("#buddy2").on("swiperight",function(){
      $(this).addClass('rotate-left').delay(700).fadeOut(1);
      $('#buddy2').find('.status').remove();
			$timeout($scope.swipeRight3,100)
    });  

    $("#buddy2").on("swipeleft",function(){
	    $(this).addClass('rotate-right').delay(700).fadeOut(1);
	    $scope.next();
	    $('#buddy2').find('.status').remove();
	    if ( $(this).is(':last-child') ) {
	     $('.buddy:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
	     } else {
	        $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
	    } 
  	});
	});
})

