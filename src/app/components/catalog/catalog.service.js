(function() {
  'use strict';

  angular
    .module('app.catalog')
    .service("CatalogService", catalogService);

  /** @ngInject */

  function catalogService(ResourceService, serviceBase) {
    return {
      getAllProducts: getAllProducts,
      getAllCategories: getAllCategories,
      getAllBrands: getAllBrands,
      getCategoryById: getCategoryById,
      getProductById: getProductById
    };

    function getAllProducts(queryParams) {
      return ResourceService(serviceBase + "catalog/products", queryParams).query();
    }

    function getAllCategories(queryParams) {
      return ResourceService(serviceBase + "catalog/categories", queryParams).query();
    }

    function getAllBrands(queryParams) {
      return ResourceService(serviceBase + "catalog/brands", queryParams).query();
    }

    function getCategoryById(categoryId) {
      return ResourceService(serviceBase + "catalog/categories/"+ categoryId).get();
    }

    function getProductById(productId) {
      return ResourceService(serviceBase + "catalog/products/"+ productId).get();
    }
  }
})();
