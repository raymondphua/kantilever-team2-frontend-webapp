(function() {
  'use strict';

  angular
    .module('app.main')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(CatalogService) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1483973234259;

    vm.products = CatalogService.getAllProducts();

  }
})();
