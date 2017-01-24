(function() {
  'use strict';

  angular
    .module('app.main')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(CatalogService) {
    var vm = this;

    vm.products = CatalogService.getAllProducts();
  }
})();
