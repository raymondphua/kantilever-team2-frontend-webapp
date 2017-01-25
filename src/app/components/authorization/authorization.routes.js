(function() {
  'use strict';

  angular
    .module('app.authorization')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/components/authorization/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm',
        data: {
          permissions: {
            except: ['user'],
            redirectTo: 'home'
          }
        }
      })
      .state('register', {
        url: '/register',
        templateUrl: 'app/components/authorization/registration/registration.html',
        controller: 'RegistrationController',
        controllerAs: 'vm'
      });

  }
})();

