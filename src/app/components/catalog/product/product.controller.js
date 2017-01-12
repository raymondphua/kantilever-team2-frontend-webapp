(function() {
  'use strict';

  angular
    .module('app.catalog')
    .controller("ProductController",productController);

  /** @ngInject */

  function productController($state, product, ShoppingCartService, $rootScope) {
    var vm = this;

    vm.init = function () {

      vm.categoryName = $state.params.categoryName;
      vm.product = product;

      vm.addProductToCart = function () {
        $rootScope.$emit('cartUpdated', ShoppingCartService.addToCart(vm.product)); //addToCart(insert product here)
      }

    }
  }
})();
