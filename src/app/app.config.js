(function() {
  'use strict';

  angular
    .module('feweb')
    .config(config);

  /** @ngInject */
  function config($logProvider, $httpProvider, $urlRouterProvider) {
    $logProvider.debugEnabled(true);
    $httpProvider.interceptors.push('httpRequestInterceptor');
    $urlRouterProvider.deferIntercept();//intercept the default route change (so the permissions in the run method can be loaded before a state change event takes place)
  }
})();
