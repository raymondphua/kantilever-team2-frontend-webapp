(function() {
  'use strict';

  angular
    .module('app.main')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(CatalogService) {
    var vm = this;

    CatalogService.getAllProducts().$promise.then(function (response) {
      vm.products = response.items;
    });
  }
})();
