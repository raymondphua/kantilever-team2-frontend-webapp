(function() {
  'use strict';

  angular
    .module('app.catalogus')
    .service("CatalogService", catalogusService);

  /** @ngInject */

  function catalogusService(ResourceService, serviceBase) {

    return {
      getAll: getAll,
      getOne: getOne,
      update: update,
      getAllCategories: getAllCategories,
      getAllBrands: getAllBrands
    };

    function getAll() {
      return ResourceService(serviceBase + 'products').query();
    }

    function getOne(number) {
      return ResourceService(serviceBase + 'products/' + number).get();
    }

    function update(product) {
      return ResourceService(serviceBase + 'products/' + product.id).update(product);
    }

    function getAllCategories() {
      // console.log("service getAllCategories call");

      return ["cat1", "cat2", "cat3","cat4", "cat5", "cat6","cat7", "cat8", "cat9"];
      // return ResourceService(serviceBase + 'categories/').get();
    }

    function getAllBrands() {

      return ["brand1", "brand2","brand3", "brand4","brand5", "brand6"];
      // return ResourceService(serviceBase + 'brands/').get();
    }

  }
})();
