(function() {
  'use strict';

  angular
    .module('app.catalogus')
    .service(catalogusService);

  /** @ngInject */

  function catalogusService(ResourceService, serviceBase) {
    return {
      getAll: getAll,
      getOne: getOne,
      update: update
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
  }
})();
