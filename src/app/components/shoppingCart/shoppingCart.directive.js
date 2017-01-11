(function() {
  'use strict';

  angular
    .module('app.shoppingCart')
    .directive('shoppingcart', shoppingCart);

  /** @ngInject */
  function shoppingCart() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/shoppingCart/shoppingCart.html',
      scope: {
      },
      controller: ShoppingCartController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function ShoppingCartController($localStorage, $rootScope) {
      var vm = this;

      if ($localStorage.items == undefined) {
        $localStorage.items = [];
      }

      // //TODO: REMOVE TEST DATA
      // $localStorage.items = [{ id: 1, name: 'test product', description: 'Test description', price: 13.3, quantity: 1},
      //                        { id: 2, name: 'test 2', description: 'Test 222222222', price: 33.3, quantity: 1}];

      vm.itemCount = updateCartCount();

      $rootScope.$on('cartUpdated', function (event) {
        vm.itemCount = updateCartCount();
      });

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
