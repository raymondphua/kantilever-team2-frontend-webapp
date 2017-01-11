(function() {
  'use strict';

  angular
    .module('app.catalog')
    .controller("ProductController",productController);

  /** @ngInject */

  function productController($state, product) {
    var vm = this;

    vm.init = function () {

      vm.categoryName = $state.params.categoryName;
      vm.product = product;

    }

  }
})();
