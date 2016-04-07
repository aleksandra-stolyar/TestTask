app.factory('Messages', ['Flash', function(Flash) {

  return {
    success: function(message) {
      Flash.create('success', message, 3000, true)
    },

    error: function(message) {
      Flash.create('danger', message, 3000, true)
    },

    warning: function(message) {
      Flash.create('warning', message, 3000, true)
    }
  }
}]);
