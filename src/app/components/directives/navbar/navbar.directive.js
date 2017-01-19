(function() {
  'use strict';

  angular
    .module('app.directives')
    .directive('navbar', navbar);

  /** @ngInject */
  function navbar() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/directives/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    /** @ngInject */
    function NavbarController(CatalogService, AuthorizationService, $state) {
      var vm = this;

      vm.limit = 3;

      vm.logOut = function () {
        AuthorizationService.logout();
        $state.go("shoppingCartDetail");
      };

      CatalogService.getAllCategories().$promise.then(function (response) {
        var subCategories = [];

        vm.trees = [{
          name: "Zoek producten",
          link: "#",
          subtree: [{
            name: "Categorieën",
            link: "#",
            subtree: subCategories
          }]
        }];

        response.forEach(function (category) {
          subCategories.push({name:category.name, link: "catalog({categoryFilter:"+category._id+"})"})
        });

        CatalogService.getAllBrands().$promise.then(function(response) {
          var subBrands = [];
          var subTree = {
            name: "Merken",
            link: "#",
            subtree: subBrands
          };

          response.forEach(function(brand) {
            subBrands.push({name: brand.name, link: "catalog({brandFilter:"+brand._id+"})"});
          });

          vm.trees[0].subtree.push(subTree);
        });
      });
    }
  }
})();
