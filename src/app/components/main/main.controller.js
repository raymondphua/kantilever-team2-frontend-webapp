(function() {
  'use strict';

  angular
    .module('app.main')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, ShoppingCartService, $rootScope, $sessionStorage) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1483973234259;

    vm.click = function() {
      $rootScope.$emit('cartUpdated', updateCart({ id: $sessionStorage.items.length + 1, name: "test"}, ShoppingCartService.addToCart)); //addToCart(insert product here)
    };

    vm.clickAgain = function() {
      $rootScope.$emit('cartUpdated', updateCart({ id: 1, name:'test'}, ShoppingCartService.addToCart));
    };

    vm.remove = function() {
      $rootScope.$emit('cartUpdated', updateCart({ id: 1, name: "test"}, ShoppingCartService.removeFromCart));
    };

    $rootScope.$on('cartUpdated', function(event) {
      vm.arraySize = $sessionStorage.items.length;
    });

    function updateCart(product, shoppingCartFunction) {
      shoppingCartFunction(product, $sessionStorage.items);
    }
  }
})();
