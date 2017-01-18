(function() {
  'use strict';

  angular
    .module('app.order')
    .service("OrderService", orderService);

  /** @ngInject */

  function orderService(ResourceService, serviceBase) {
    return {
      createOrder: createOrder,
      getAllOrders: getAllOrders
    };

    function createOrder(order) {
      return ResourceService(serviceBase + "orderprocessservice/orders").create(order);
    }

    function getAllOrders(){
      ResourceService(serviceBase + "orderservice/orders").query();
    }
  }
})();
