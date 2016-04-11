app.directive('emailExists', ['$http', '$timeout', function( $http, $timeout ) {
  return {
    restrict: 'AE',
    require : 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$asyncValidators.userExists = function(email) {
        return $http.get('/profile/user_search', { params: {"email": email} })
          .then(function (response) {
            $timeout(function(){
              ngModel.$setValidity('userExists', !!response.data.user_exists);
            }, 1000);
          });
      };
    }
  }
}]);
