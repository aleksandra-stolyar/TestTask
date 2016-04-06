app.controller("ModalController", ['$uibModalInstance', '$scope', 'item', function($uibModalInstance, $scope, item){
  $scope.product = item;
  $scope.ok = function (data) {
    $uibModalInstance.close(data);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.isNumberKey = function (e) {
    // dot and backspace
    if ($.inArray(e.keyCode, [46, 8, 190]) !== -1 ||
       // Ctrl+C
      (e.keyCode == 67 && e.ctrlKey === true) ) {
      return;
    }

    if (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) {
      e.preventDefault();
    }
  };

}])
