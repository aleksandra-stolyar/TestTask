app.controller("ProductsController", ['ProductsService', '$scope', '$uibModal', function(ProductsService, $scope, $uibModal){
  var vm = this;
  vm.products = [];

  vm.itemsPerPage = [10, 20, 50];
  vm.selected = vm.itemsPerPage[0];
  vm.totalProductCount = 0;
  vm.defaultPage = 1;

  $scope.$on('pageNumber', function (event, data) {
    vm.currentPage = data;
  });

  vm.productIndex = function (index) {
    var newIndex;
    if (vm.currentPage != 1 ) {
      newIndex = (vm.currentPage-1)*10 + (index+1);
    } else {
      newIndex = index + 1;
    }
    return newIndex;
  };
  vm.getPaginated = function(pageNumber) {
    $scope.$emit('pageNumber', pageNumber);
    vm.products = [];
    ProductsService.getPaginated(pageNumber, vm.selected )
      .then(function(response) {
        vm.products = response.data.products;
        vm.totalProductCount = response.data.total_count;
      })
  };

  vm.getPaginated(vm.defaultPage);

  // var modalInstance = $uibModal.open({
  //   animation: $scope.animationsEnabled,
  //   templateUrl: 'modal/_modal.html',
  //   controller: 'ModalController'
  // });

  vm.create = function() {
    $scope.product = {};
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'modal/_modal.html',
      controller: 'ModalController',
      resolve: {
        item: function () {
          return $scope.product;
        }
      }
    });
    modalInstance.result.then(function(data) {
      ProductsService.create(data)
        .then(function successCallback(response) {
          vm.getPaginated(vm.defaultPage);
          vm.product = {};
          // messages
        }, function errorCallback(response) {
          // messages
        });
    });
  };

  vm.delete = function(product) {
    ProductsService.delete(product)
      .then(function successCallback(response) {
        vm.products = _.without(vm.products, product);
        // messages
      }, function errorCallback(response) {
        // messages
      });
  };

  vm.update = function(product) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'modal/_modal.html',
      controller: 'ModalController',
      resolve: {
        item: function () {
          return product;
        }
      }
    });
    modalInstance.result.then(function(data) {
      ProductsService.update(data)
        .then(function successCallback(response) {
          // messages
        }, function errorCallback(response) {
          // messages
        });
    });
  };

  vm.selectAll = function() {

  };

  vm.deleteSelected = function() {

  };


}])
