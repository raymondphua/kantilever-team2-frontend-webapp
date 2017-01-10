(function() {
  'use strict';

  angular
    .module('app.catalogus')
    .controller("CatalogusOverzichtController",catalogusOverzichtController);

  /** @ngInject */

  function catalogusOverzichtController() {
    var vm = this;

    vm.init = function () {
      vm.categories = [
        {name:"Aandrijving en versnelling", image: "/assets/images/categories/aandrijving_en_versnelling.jpg"},
        {name:"Accu elektrische fiets", image: "/assets/images/categories/accu_elektrische_fiets.jpg"},
        {name:"Bagagedragers", image: "/assets/images/categories/bagagedragers.jpg"},
        {name:"Balhoofd", image: "/assets/images/categories/balhoofd.jpg"}];
    }

  }
})();
