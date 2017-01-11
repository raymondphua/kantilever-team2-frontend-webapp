(function() {
  'use strict';

  angular
    .module('app.catalog')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('catalog', {
        url: '/catalog',
        templateUrl: 'app/components/catalog/overview/catalogOverview.html',
        controller: 'CatalogOverviewController',
        controllerAs: 'vm'
      })
      .state('catalog-category', {
        url: '/catalog/:categoryName',
        templateUrl: 'app/components/catalog/category/category.html',
        controller: 'CategoryController',
        controllerAs: 'vm',
        params: {'categoryName': '', 'category': null},
        resolve: {
          category: function($stateParams, CatalogService) {
            if(!$stateParams.category){
              return CatalogService.getCategoryByCategoryName($stateParams.categoryName);
              // return CatalogService.getCategoryByCategoryName($stateParams.categoryName).$promise.then(function(category){
              //   console.log(category);
              //   return category;
              // });
            }
            else{
              return $stateParams.category;
            }
          }
        }
      })
      .state('catalog-category-product', {
        url: '/catalog/:categoryName/:productName',
        templateUrl: 'app/components/catalog/product/product.html',
        controller: 'ProductController',
        controllerAs: 'vm',
        params: {'categoryName': '', 'productName': '', 'product': null},
        resolve: {
          product: function($stateParams, CatalogService) {
            if(!$stateParams.product){
              console.log("no product given");
              return CatalogService.getProductByProductName($stateParams.productName);
              // return CatalogService.getProductByProductName($stateParams.productName).$promise.then(function(product){
              //   return product;
              // });
            }
            else{
              return $stateParams.product;
            }
          }
        }
      });
  }
})();
