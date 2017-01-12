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
      // .state('catalog-category', {
      //   url: '/catalog/:categoryName',
      //   templateUrl: 'app/components/catalog/category/category.html',
      //   controller: 'CategoryController',
      //   controllerAs: 'vm',
      //   params: {'categoryName': '', 'category': null},
      //   resolve: {
      //     category: function($stateParams, CatalogService) {
      //       if(!$stateParams.category){
      //         return CatalogService.getCategoryByCategoryName($stateParams.categoryName);
      //       }
      //       else{
      //         return $stateParams.category;
      //       }
      //     }
      //   }
      // })
      // .state('catalog-category-product', {
      //   url: '/catalog/:categoryName/:productId',
      //   templateUrl: 'app/components/catalog/product/product.html',
      //   controller: 'ProductController',
      //   controllerAs: 'vm',
      //   params: {'categoryName': '', 'productId': '', 'product': null},
      //   resolve: {
      //     product: function($stateParams, CatalogService) {
      //       if(!$stateParams.product){
      //         return CatalogService.getProductByProductName($stateParams.productName);
      //         // return CatalogService.getProductByProductName($stateParams.productName).$promise.then(function(product){
      //         //   return product;
      //         // });
      //       }
      //       else{
      //         return $stateParams.product;
      //       }
      //     }
      //   }
      // });
  }
})();
