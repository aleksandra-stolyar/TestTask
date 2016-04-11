app.factory('AuthService', ['$http', '$q', function($http, $q) {
  return {
    checkUserExists: function (email) {
      return $http.get('/profile/user_search', { params: {"email": email} })
    }
  }

}]);
