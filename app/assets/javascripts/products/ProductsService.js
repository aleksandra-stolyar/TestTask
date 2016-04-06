app.service('ProductsService', ['$http', function($http) {
  var products = {
    products: []
  };

  products.getAll = function() {
    return $http.get('/products')
      .then(function(response) {
        angular.copy(response.data.products, products.products)
      })
  };

  products.getPaginated = function(pageNumber, productsPerPage) {
    // debugger
    // products.products = [];
    return $http.get('products/' + pageNumber + '/' + productsPerPage)
  };

  products.create = function(product) {
    return $http.post('/products', product)
  };

  products.delete = function(product) {
    return $http.delete('/products/' + product.id)
  };

  products.update = function(product) {
    return $http.patch('/products/' + product.id, {"name": product.name, "price": product.price, "details": product.details})
  };

  return products;
}]);
