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
      data: {
        requireLogin : true
      },
      resolve: {
        productsPromise: ['ProductsService', function (ProductsService){
          return ProductsService.getAll();
        }]
      }
    })
    .state('login', {
      url: '/login',
      data: {
        requireLogin : false
      },
      onEnter: ['$stateParams', '$state', '$uibModal', 'Auth','$rootScope', function ($stateParams, $state, $uibModal, Auth, $rootScope, $log) {
        var modalInstance = $uibModal.open({
          backdrop: false,
          templateUrl: "authentication/_authModal.html",
          controller: 'AuthModalController',
          controllerAs: 'authCtrl'
        }).result.finally(function () {
          $state.go('products', 'Successfully logged in!');
        })
      }]
    });

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('login');

}]);

// Intercept 401 Unauthorized everywhere
app.config(['AuthInterceptProvider', function (AuthInterceptProvider) {
  AuthInterceptProvider.interceptAuth(true);
}]);

app.run(['$rootScope', '$state', 'Auth', '$log', 'AuthService', function ($rootScope, $state, Auth, $log, AuthService) {

  $rootScope.$on('devise:unauthorized', function(event) {
    $state.go('login', 'User unauthorized');
  });

  $rootScope.$on('$stateChangeStart', function (e, toState) {
    var result = toState.data.requireLogin;
    if (result && $rootScope.currentUser == undefined) {
      e.preventDefault();
    }
  });

  $rootScope.$on('devise:login', function(event, currentUser) {
    $rootScope.currentUser = Auth._currentUser;
    $rootScope.$broadcast('rootScope:broadcast', $rootScope.currentUser);
    $log.debug(currentUser.email + ' has logged in!', currentUser);
    $state.go('products', 'User has signed in');
  });

  $rootScope.$on('devise:logout', function(event, oldCurrentUser) {
    delete $rootScope.currentUser;
    $log.debug(oldCurrentUser.email + ' has logged out!', oldCurrentUser);
    $state.go('signin', 'User has signed out');
  });

  $rootScope.$on('devise:new-registration', function(event, user) {
    $rootScope.currentUser = Auth._currentUser;
    $rootScope.$broadcast('rootScope:broadcast', $rootScope.currentUser);
    $log.debug(user.email + ' has signed up!', user);
    $state.go('products', 'New user has registered');
  });


}]);
