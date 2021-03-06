(function() {
  'use strict';

  angular
    .module('app.shoppingCart')
    .controller('ShoppingCartController', ShoppingCartController);

  /** @ngInject */
  function ShoppingCartController(ShoppingCartService, $rootScope, $localStorage) {
    var vm = this;

    refreshCart();

    var deregisterationCallback = $rootScope.$on('cartUpdated', refreshCart);

    $rootScope.$on('$destroy', deregisterationCallback);

    function calculateTotalPrice() {
      var total = 0;
      $localStorage.items.forEach(function(product) {
        total += product.quantity * product.price;
      });

      vm.totalPrice = total;
    }

    vm.addToCart = function(product) {
      $rootScope.$emit('cartUpdated', updateCart(product, ShoppingCartService.addToCart)); //addToCart(insert product here)
    };

    vm.removeFromCart = function(product) {
      $rootScope.$emit('cartUpdated', updateCart(product, ShoppingCartService.removeFromCart));
    };

    function updateCart(product, shoppingCartFunction) {
      shoppingCartFunction(product, $localStorage.items);
    }

    function refreshCart() {
      if($localStorage.items != undefined){
        vm.cart = $localStorage.items;
        calculateTotalPrice();
      }
    }
  }
})();
