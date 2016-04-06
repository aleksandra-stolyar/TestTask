var app = angular.module("spaTask", [
  'ui.router',
  'templates',
  'ngFlash',
  'ui.bootstrap',
  'xeditable',
  'angularUtils.directives.dirPagination',
  'ngMessages',
  'Devise'
]);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state('products', {
      url: '/products',
      templateUrl: 'products/_main.html',
      // data: {
      //   requireLogin : true
      // },
      resolve: {
        productsPromise: ['ProductsService', function (ProductsService){
          return ProductsService.getAll();
        }]
      }

    });
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('products');

}]);

