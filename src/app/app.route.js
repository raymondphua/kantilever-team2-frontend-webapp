(function() {
  'use strict';

  angular
    .module('feweb')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  }

})();
