app.controller('AuthModalController', ['$scope', '$uibModalInstance', 'Auth', 'AuthService', function ($scope, $uibModalInstance, Auth, AuthService) {
  var vm = this;
  vm.user = {};
  vm.test = "Test";

  vm.sendUser = function () {
    AuthService.checkUserExists(vm.user.email)
      .then(function(response) {
        if (response.data.user_exists) {
          vm.signin();
        } else {
          vm.signup();
        };
      });
  };

  vm.signin = function() {
    Auth.login(vm.user).then(function(user) {
      $uibModalInstance.close(user);
    })
  };

  vm.signup = function() {
    Auth.register(vm.user).then(function(user) {
      $uibModalInstance.dismiss();
    })
  };

}]);