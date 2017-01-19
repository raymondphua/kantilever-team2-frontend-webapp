(function() {
  'use strict';

  angular
    .module('feweb')
    .factory("ResourceService", factory);

  /** @ngInject */
  function factory($resource) {
    return function( url, params, methods ) {
      var defaults = {
        update: { method: 'put', isArray: false },
        create: { method: 'post' },
        saveAsFormEncoded: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      };

      methods = angular.extend( defaults, methods );

      var resource = $resource( url, params, methods );

      resource.prototype.$save = function() {
        if ( !this.id ) {
          return this.$create();
        }
        else {
          return this.$update();
        }
      };

      return resource;
    };
  }
})();
