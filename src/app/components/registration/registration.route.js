(function() {
  'use strict';

  angular
    .module('app.registration')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('register', {
        url: '/register',
        templateUrl: 'app/components/registration/registration.html',
        controller: 'RegistrationController',
        controllerAs: 'vm'
      });
  }
})();
