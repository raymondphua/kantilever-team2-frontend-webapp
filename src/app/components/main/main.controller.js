(function() {
  'use strict';

  angular
    .module('app.main')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout) { //ShoppingCartService, $rootScope, $sessionStorage these 3 are needed for shoppingCart
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1483973234259;


    //Sample code of how to call the cartService for updating the cart



    // vm.click = function() {
    //   $rootScope.$emit('cartUpdated', updateCart({ id: $sessionStorage.items.length + 1, name: "test"}, ShoppingCartService.addToCart)); //addToCart(insert product here)
    // };
    //
    // vm.remove = function() {
    //   $rootScope.$emit('cartUpdated', updateCart({ id: 1, name: "test"}, ShoppingCartService.removeFromCart));
    // };
    //
    // $rootScope.$on('cartUpdated', function(event) {
    //   vm.arraySize = $sessionStorage.items.length;
    // });
    //
    // function updateCart(product, shoppingCartFunction) {
    //   shoppingCartFunction(product, $sessionStorage.items);
    // }
  }
})();
