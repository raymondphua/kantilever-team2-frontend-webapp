(function() {
  'use strict';

  angular
    .module('app.directives')
    .directive('navbar', navbar);

  /** @ngInject */
  function navbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/directives/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(CatalogService) {
      var vm = this;

      vm.limit = 3;

      vm.trees = [{
        name: "Konami",
        link: "#",
        subtree: [{
          name: "Metal Gear",
          link: "#",
          subtree: [{
            name: "Metal Gear",
            link: "metal-gear"
          }, {
            name: "Metal Gear 2: Solid Snake",
            link: "#"
          }, {
            name: "Metal Gear Solid: The Twin Snakes",
            link: "#"
          }]
        }, {
          name: "divider",
          link: "#"
        }]
      }];

      vm.categories = CatalogService.getAllCategories();
      vm.brands = CatalogService.getAllBrands();
    }
  }
})();
