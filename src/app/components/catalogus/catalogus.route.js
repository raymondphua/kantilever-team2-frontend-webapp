(function() {
  'use strict';

  angular
    .module('app.catalogus')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('catalogus', {
        url: '/catalogus',
        templateUrl: 'app/components/catalogus/catalogusOverzicht.html',
        controller: 'CatalogusOverzichtController',
        controllerAs: 'vm'
      });
  }
})();
