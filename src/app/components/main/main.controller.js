(function() {
  'use strict';

  angular
    .module('app.main')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(CatalogService) {
    var vm = this;

    CatalogService.getAllProducts({page: 0, size: 4}).$promise.then(function (response) {
      vm.products = response.items;
    });
  }
})();
