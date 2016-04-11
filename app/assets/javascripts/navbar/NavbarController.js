app.controller('NavbarController', ['$scope', 'Auth', function($scope, Auth, $rootScope){

  $scope.$on('rootScope:broadcast', function (event, currentUser, isAuthenticated) {
    $scope.user = currentUser;
    $scope.signedIn = isAuthenticated;
  });

  $scope.logout = Auth.logout;
}]);