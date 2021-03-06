(function() {
  'use strict';

  angular
    .module('feweb')
    .run(runBlock);

  /** @ngInject */
  function runBlock(PermPermissionStore, AuthorizationService, $urlRouter, $state, $rootScope, ShoppingCartService) {

    PermPermissionStore.definePermission('user', function(){
      return AuthorizationService.isLoggedIn();
    });

    $urlRouter.sync();
    $urlRouter.listen();

    AuthorizationService.getCurrentUser().then(function(user){
      $rootScope.user = user;
    });

    var deregisterationCallback =  $rootScope.$on('$stateChangeStart', function (event, toState) {
      if (toState.name === 'order') {
        if (ShoppingCartService.getAllCartProducts().length < 1) {
          event.preventDefault();
          $state.go('shoppingCartDetail');
        }
      }
    });

    $rootScope.$on('$destroy', deregisterationCallback);
  }
})();
