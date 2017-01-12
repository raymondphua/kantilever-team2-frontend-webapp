(function() {
  'use strict';

  angular
    .module('app.catalog')
    .controller("CategoryController",categoryController);

  /** @ngInject */

  function categoryController(category, CatalogService) {
    var vm = this;

    vm.init = function () {

      vm.itemsPerPage = 2;

      vm.setPage = function (pageNo) {
        vm.currentPage = pageNo;
      };

      vm.category = category;

      // //todo filter by selected category
      // vm.products = [
      //   {name: "Sturmey Archer tandwiel 14 tands sdfgdf gsdf g sdfg sfdg fsd", image: "/assets/images/categories/aandrijving_en_versnelling/producten/Sturmey Archer tandwiel 14 tands.jpg", price: 2.95},
      //   {name: "Sturmey Archer tandwiel 15 tands", image: "/assets/images/categories/aandrijving_en_versnelling/producten/Sturmey Archer tandwiel 15 tands.jpg", price: 2.95},
      //   {name: "Sturmey Archer tandwiel 17 tands", image: "/assets/images/categories/aandrijving_en_versnelling/producten/Sturmey Archer tandwiel 17 tands.jpg", price: 2.95}
      // ];

      CatalogService.getAllProducts({categories: category._id}).$promise.then(function (response) {
        vm.products = response;
        vm.totalItems = vm.products.length;
        vm.currentPage = 1;
      });
    }

  }
})();
