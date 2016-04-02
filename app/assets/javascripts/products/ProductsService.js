app.service('ProductsService', ['$http', function($http) {
  var products = {
    products: []
  };

  products.getAll = function() {
    // debugger
    return $http.get('/products')
      .then(function(data) {
        // debugger
        angular.copy(products, data)
      })
  };

  return products;
}]);
