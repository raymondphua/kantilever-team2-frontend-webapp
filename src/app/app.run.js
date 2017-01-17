(function() {
  'use strict';

  angular
    .module('feweb')
    .run(runBlock);

  /** @ngInject */
  function runBlock($state, $rootScope, ShoppingCartService) {
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
