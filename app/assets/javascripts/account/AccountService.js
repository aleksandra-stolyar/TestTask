app.service('AccountService', ['$http', function($http) {
  var user = {};

  user.edit = function(user) {
    return $http.patch('/users', {"user": {"name": user.name, "surname": user.surname, "phone": user.phone}})
  };

  user.changePassword = function(password, passwordConfirm) {
    return $http.patch('/profile/update_password', {user: {"password": password, "password_confirmation": passwordConfirm}})
  };

  return user;
}]);
