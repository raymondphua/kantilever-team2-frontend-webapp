(function() {
  'use strict';

  angular
    .module('app.shoppingCart')
    .controller('ShoppingCartController', ShoppingCartController);

  /** @ngInject */
  function ShoppingCartController(ShoppingCartService, $rootScope, $localStorage) { //ShoppingCartService, $rootScope, $localStorage these 3 are needed for shoppingCart
    var vm = this;

    refreshCart();
    $rootScope.$on('cartUpdated', refreshCart);

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
      vm.cart = $localStorage.items;
      calculateTotalPrice();
    }
  }
})();
