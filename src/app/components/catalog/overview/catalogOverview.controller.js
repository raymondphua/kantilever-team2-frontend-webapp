(function() {
  'use strict';

  angular
    .module('app.catalog')
    .controller("CatalogOverviewController",catalogOverviewController);

  /** @ngInject */

  function catalogOverviewController(CatalogService) {
    var vm = this;

    vm.init = function () {

      vm.categories = CatalogService.getAllCategories();

      // vm.categories = [
      //   {name:"Aandrijving en versnelling", image: "/assets/images/categories/aandrijving_en_versnelling/aandrijving_en_versnelling.jpg", canonicalName:"aandrijving-en-versnelling"},
      //   {name:"Accu elektrische fiets", image: "/assets/images/categories//accu_elektrische_fiets/accu_elektrische_fiets.jpg", canonicalName:"accu-elektrische-fiets"},
      //   {name:"Bagagedragers", image: "/assets/images/categories/bagagedragers/bagagedragers.jpg", canonicalName:"bagagedragers"},
      //   {name:"Balhoofd", image: "/assets/images/categories/balhoofd/balhoofd.jpg", canonicalName:"balhoofd"}];
    }

  }
})();
