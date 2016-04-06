app.controller("ModalController", ['$uibModalInstance', '$scope', 'item', function($uibModalInstance, $scope, item){
  $scope.product = item;
  $scope.ok = function (data) {
    $uibModalInstance.close(data);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

}])
