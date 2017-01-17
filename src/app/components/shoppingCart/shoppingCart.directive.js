(function() {
  'use strict';

  angular
    .module('app.shoppingCart')
    .directive('shoppingcart', shoppingCart);

  /** @ngInject */
  function shoppingCart() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/shoppingCart/shoppingCart.html',
      scope: {
      },
      controller: ShoppingCartController,
      controllerAs: 'vm',
      bindToController: true
    };
    /** @ngInject */
    function ShoppingCartController($localStorage, $rootScope) {
      var vm = this;

      if ($localStorage.items == undefined) {
        $localStorage.items = [];
      }

      vm.itemCount = updateCartCount();

      var deregisterationCallback = $rootScope.$on('cartUpdated', function () {
        vm.itemCount = updateCartCount();
      });

      $rootScope.$on('$destroy', deregisterationCallback);

      function updateCartCount() {
        var count = 0;
        $localStorage.items.forEach(function(product) {
           count += product.quantity;
        });

        return count;
      }
    }
  }

})();
