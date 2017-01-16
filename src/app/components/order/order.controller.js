(function() {
  'use strict';

  angular
    .module('app.order')
    .controller("OrderController",orderController);

  /** @ngInject */

  function orderController(ShoppingCartService, OrderService) {
    var vm = this;

    vm.init = function () {
      vm.products = ShoppingCartService.getAllCartProducts();
      vm.productsTotalPrice = ShoppingCartService.getCartProductsTotalPrice();
      vm.productsTotalItems = ShoppingCartService.getCartProductsTotalItems();
    }
  }
})();
