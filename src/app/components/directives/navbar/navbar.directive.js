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

      // vm.trees = [{
      //   name: "Konami",
      //   link: "#",
      //   subtree: [{
      //     name: "Metal Gear",
      //     link: "#",
      //     subtree: [{
      //       name: "Metal Gear",
      //       link: "metal-gear"
      //     }, {
      //       name: "Metal Gear 2: Solid Snake",
      //       link: "#"
      //     }, {
      //       name: "Metal Gear Solid: The Twin Snakes",
      //       link: "#"
      //     }]
      //   }, {
      //     name: "divider",
      //     link: "#"
      //   }]
      // }];

      CatalogService.getAllCategories().$promise.then(function (response) {
        var subCategories = [];

        vm.trees = [{
          name: "Filter",
          link: "#",
          subtree: [{
            name: "Categorieën",
            link: "#",
            subtree: subCategories
          }]
        }];

        response.forEach(function (category) {
          subCategories.push({name:category, link: "#"})
        });

        CatalogService.getAllBrands().$promise.then(function(response) {
          var subBrands = [];
          var subTree = {
            name: "Merken",
            link: "#",
            subtree: subBrands
          };

          response.forEach(function(brand) {
            subBrands.push({name: brand, link: "#"});
          });

          vm.trees[0].subtree.push(subTree);
        });
      });
    }
  }
})();
