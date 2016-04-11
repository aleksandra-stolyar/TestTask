app.controller('AccountController', ['$scope', 'Auth', '$rootScope', 'AccountService', function($scope, Auth, $rootScope, AccountService){
  var vm = this;
  vm.user = Auth._currentUser;

  vm.editProfileData = function() {
    AccountService.edit(vm.user)
      .then(function(response) {
        debugger
      })
  };

  vm.changePassword = function() {
    AccountService.changePassword(vm.user.password, vm.user.passwordConfirm)
      .then(function successCallback(response) {
        vm.user.password = {};
        vm.user.passwordConfirm = {};
        Messages.success(response.data.message);
      }, function errorCallback(response) {
        Messages.error(response.data.message)
      });
  };

}]);
