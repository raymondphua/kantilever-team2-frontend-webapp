(function() {
  'use strict';

  angular
    .module('app.order')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('order', {
        url: '/order',
        templateUrl: 'app/components/order/order.html',
        controller: 'OrderController',
        controllerAs: 'vm',
        data: {
          permissions: {
            only: ['user'],
            redirectTo: 'login'
          }
        },
        resolve: {
          customer: function(AuthorizationService) {
            return AuthorizationService.getCurrentUser().then(function (user) {
              return user;
            })
          }
        }
      });
  }
})();
