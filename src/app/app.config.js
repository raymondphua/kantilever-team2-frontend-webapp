(function() {
  'use strict';

  angular
    .module('feweb')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);
  }

})();
