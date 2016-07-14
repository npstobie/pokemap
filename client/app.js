angular.module('app', [
  'ui.router',
  'ngResource',
  'app.grid',
  'app.spot',
  'app.places-service'
]).config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);  
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'grid/grid.html'
    })
    .state('spot', {
      url: '/spot',
      templateUrl: 'spot/spot.html'
    })
})
