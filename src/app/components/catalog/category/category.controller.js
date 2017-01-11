(function() {
  'use strict';

  angular
    .module('app.catalog')
    .controller("CategoryController",categoryController);

  /** @ngInject */

  function categoryController($state, category, CatalogService) {
    var vm = this;

    vm.init = function () {

      vm.category = category;

      //todo filter by selected category
      vm.products = [
        {name: "Sturmey Archer tandwiel 14 tands sdfgdf gsdf g sdfg sfdg fsd", image: "/assets/images/categories/aandrijving_en_versnelling/producten/Sturmey Archer tandwiel 14 tands.jpg", price: 2.95},
        {name: "Sturmey Archer tandwiel 15 tands", image: "/assets/images/categories/aandrijving_en_versnelling/producten/Sturmey Archer tandwiel 15 tands.jpg", price: 2.95},
        {name: "Sturmey Archer tandwiel 17 tands", image: "/assets/images/categories/aandrijving_en_versnelling/producten/Sturmey Archer tandwiel 17 tands.jpg", price: 2.95}
      ];

      vm.products = CatalogService.getAllProducts();
    }

  }
})();
