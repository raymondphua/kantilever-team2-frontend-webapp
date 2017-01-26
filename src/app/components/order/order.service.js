(function() {
  'use strict';

  angular
    .module('app.order')
    .service("OrderService", orderService);

  /** @ngInject */

  function orderService(ResourceService, serviceBase, $q) {
    return {
      createOrder: createOrder,
      getAllOrders: getAllOrders,
      getOrderById: getOrderById
    };

    function createOrder(order) {
      var defer = $q.defer();

      ResourceService(serviceBase + "orderservice/orders").create(order, function (data, headers) {
        var newOrderLocation = headers('Location');
        var response = {newOrderLocation: newOrderLocation};
        defer.resolve(response)
      }, function (error) {
        defer.reject(error);
      });
      return defer.promise;
    }

    function getAllOrders(){
      return ResourceService(serviceBase + "orderservice/orders").query();
    }

    function getOrderById(id){
      return ResourceService(serviceBase + "orderservice/orders/" + id).get();
    }
  }
})();
