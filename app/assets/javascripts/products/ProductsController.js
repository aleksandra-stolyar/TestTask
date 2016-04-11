app.controller("ProductsController", ['ProductsService', 'Messages', '$scope', '$uibModal', function(ProductsService, Messages, $scope, $uibModal){
  var vm = this;
  vm.products = [];

  vm.itemsPerPageArray = [10, 20, 50];
  vm.itemsPerPage = vm.itemsPerPageArray[0];
  vm.totalProductCount = 0;
  vm.defaultPage = 1;

  $scope.$on('pageNumber', function (event, data) {
    vm.currentPage = data;
  });

  $scope.goDetails = function(item) {
    $scope.detailsFor = item;
  };

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
    ProductsService.getPaginated(pageNumber, vm.itemsPerPage )
      .then(function(response) {
        vm.products = response.data.products;
        vm.totalProductCount = response.data.total_count;
      })
  };

  vm.getPaginated(vm.defaultPage);

  function openModal(resolveItem) {
    return $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'modal/_modal.html',
      controller: 'ModalController',
      resolve: {
        item: function () {
          return resolveItem;
        }
      }
    });
  };

  vm.create = function() {
    $scope.product = {};
    openModal($scope.product).result.then(function(data) {
      ProductsService.create(data)
        .then(function successCallback(response) {
          vm.getPaginated(vm.defaultPage);
          vm.product = {};
          Messages.success(response.data.message)
        }, function errorCallback(response) {
          Messages.error(response.data.message)
        });
    });
  };

  vm.delete = function(product) {
    ProductsService.delete(product)
      .then(function successCallback(response) {
        vm.getPaginated(vm.defaultPage);
        Messages.warning(response.data.message)
      });
  };

  vm.update = function(product) {
    openModal(product).result.then(function(data) {
      ProductsService.update(data)
        .then(function successCallback(response) {
          Messages.warning(response.data.message);
        }, function errorCallback(response) {
          Messages.error(response.data.message);
        });
    });
  };


  vm.selectedItemsArray = [];
  vm.selectItem = function(product, checked) {
    if (checked) {
      vm.selectedItemsArray.push(product);
    } else {
      index = vm.selectedItemsArray.indexOf(product)
      vm.selectedItemsArray.splice(index, 1);
    };
  };

  vm.deleteSelected = function() {
    var array = [];
    vm.selectedItemsArray.forEach(function (product) {
      array.push( product.id )
    });

    if (array.length > 0 ) {
      ProductsService.deleteSelected(array)
        .then(function successCallback(response) {
          vm.getPaginated(vm.defaultPage);
          Messages.warning(response.data.message);
        });
    }
  };


}])
