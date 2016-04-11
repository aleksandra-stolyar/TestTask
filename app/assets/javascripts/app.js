var app = angular.module("spaTask", [
  'ui.router',
  'templates',
  'ngFlash',
  'ui.bootstrap',
  'xeditable',
  'angularUtils.directives.dirPagination',
  'ngMessages',
  'Devise',
  'ui.utils.masks'
]);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise(function($injector, $location){
    $injector.invoke(['$state', function($state) {
      $state.go('404');
    }]);
  });
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
      onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
        var modalInstance = $uibModal.open({
          backdrop: false,
          templateUrl: "authentication/_authModal.html",
          controller: 'AuthModalController',
          controllerAs: 'authCtrl'
        }).result.finally(function() {
          $state.go('products', 'Successfully logged in!')
        });
      }]
    })
    .state('account', {
      url: '/account',
      templateUrl: 'account/_account.html',
      controller: 'AccountController',
      controllerAs: 'accountCtrl',
      data: {
        requireLogin : true
      }
    })
    .state('404', {
      templateUrl: '/404.html',
      data: {
        requireLogin : false
      }
    })
}]);

// Intercept 401 Unauthorized everywhere
app.config(['AuthInterceptProvider', function (AuthInterceptProvider) {
  AuthInterceptProvider.interceptAuth(true);
}]);

app.run(['$rootScope', '$state', 'Auth', '$log', function ($rootScope, $state, Auth, $log) {
  // $rootScope.state = $state;

  Auth.currentUser();
  $rootScope.$watch(
    function() { return Auth.isAuthenticated(); },
    function(newValue, oldValue) {
      if ( newValue !== oldValue ) {
        $rootScope.isAuthenticated = newValue;
        $rootScope.currentUser = Auth._currentUser;
      }
    }
  );

  $rootScope.$on('devise:login', function(event, currentUser) {
    $rootScope.currentUser = Auth._currentUser;
    $rootScope.isAuthenticated = Auth.isAuthenticated();
    $rootScope.$broadcast('rootScope:broadcast', $rootScope.currentUser, $rootScope.isAuthenticated);
    $log.debug(currentUser.email + ' has logged in!', currentUser);
    $state.go('products', 'User has signed in');
  });

  $rootScope.$on('devise:logout', function(event, oldCurrentUser) {
    delete $rootScope.currentUser;
    $log.debug(oldCurrentUser.email + ' has logged out!', oldCurrentUser);
    $state.go('login', 'User has signed out');
  });

  $rootScope.$on('devise:new-registration', function(event, user) {
    $rootScope.currentUser = Auth._currentUser;
    $rootScope.isAuthenticated = Auth.isAuthenticated();
    $rootScope.$broadcast('rootScope:broadcast', $rootScope.currentUser, $rootScope.isAuthenticated);
    $log.debug(user.email + ' has signed up!', user);
    $state.go('products', 'New user has registered');
  });


  $rootScope.$on('devise:unauthorized', function(event) {
    $state.go('login', 'User unauthorized');
  });

  $rootScope.$on('$stateChangeStart', function (e, toState) {
    $rootScope.$emit('stateTransition', toState);
    var result = toState.data.requireLogin;
    if (result && $rootScope.currentUser == undefined) {
      e.preventDefault();
    };
  });

}]);
