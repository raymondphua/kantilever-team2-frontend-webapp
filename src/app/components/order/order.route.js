(function() {
  'use strict';

  angular
    .module('app.order')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('order', {
        url: '/order',
        templateUrl: 'app/components/order/order.html',
        controller: 'OrderController',
        controllerAs: 'vm'
      });
  }
})();
