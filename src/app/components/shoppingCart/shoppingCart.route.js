(function() {
  'use strict';

  angular
    .module('app.shoppingCart')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('shoppingCartDetail', {
        url: '/shoppingCart',
        templateUrl: 'app/components/shoppingCart/shoppingCartDetail.html',
        controller: 'ShoppingCartController',
        controllerAs: 'shoppingCart'
      });
  }
})();
