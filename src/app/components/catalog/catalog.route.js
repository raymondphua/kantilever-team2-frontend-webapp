(function() {
  'use strict';

  angular
    .module('app.catalog')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('catalog', {
        url: '/catalog?categoryFilter&brandFilter',
        templateUrl: 'app/components/catalog/overview/catalogOverview.html',
        controller: 'CatalogOverviewController',
        controllerAs: 'vm',
        params: {'categoryFilter': null, 'brandFilter': null}
      })
      .state('catalog-product', {
        url: '/catalog/product/:productId',
        templateUrl: 'app/components/catalog/product/product.html',
        controller: 'ProductController',
        controllerAs: 'vm',
        params: {'productId': '', 'product': null},
        resolve: {
          product: function($stateParams, CatalogService) {
            if(!$stateParams.product){
              return CatalogService.getProductById($stateParams.productId).$promise.then(function (product) {
                return product;
              });
            }
            else{
              return $stateParams.product;
            }
          }
        }
      });
  }
})();
