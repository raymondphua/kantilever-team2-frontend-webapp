(function() {
  'use strict';

  angular
    .module('app.order')
    .service("OrderService", orderService);

  /** @ngInject */

  function orderService(ResourceService, serviceBase) {
    return {
      createOrder: createOrder
    };

    function createOrder(order) {
      return ResourceService(serviceBase + "order").create(order);
    }
  }
})();
