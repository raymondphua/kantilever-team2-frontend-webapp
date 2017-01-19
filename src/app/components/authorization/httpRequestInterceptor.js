(function () {
  'use strict';

  angular
    .module('app.authorization')
    .factory("httpRequestInterceptor", httpRequestInterceptor);

  /** @ngInject */
  function httpRequestInterceptor($injector, $location , $q) {

    return {
      request: function (config) {
        var AuthService = $injector.get('AuthorizationService');

        config.headers['Authorization'] = AuthService.getToken();
        return config;
      },
      responseError: function (response) {
        var AuthService = $injector.get('AuthorizationService');

        if (response.status === 401 || response.status === 403) {
          if(AuthService.getToken()){
            AuthService.logout();
          }
          $location.path('/login');
        }
        return $q.reject(response);
      }
    };
  }
})();
