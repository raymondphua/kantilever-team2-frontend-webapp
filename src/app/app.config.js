(function() {
  'use strict';

  angular
    .module('feweb')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    $logProvider.debugEnabled(true);
  }

})();
