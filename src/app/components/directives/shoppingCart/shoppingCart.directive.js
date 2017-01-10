(function() {
  'use strict';

  angular
    .module('app.directives')
    .directive('shoppingcart', shoppingCart);

  /** @ngInject */
  function shoppingCart() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/directives/shoppingCart/shoppingCart.html',
      scope: {
      },
      controller: ShoppingCartController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function ShoppingCartController($sessionStorage, $rootScope) {
      var vm = this;

      if ($sessionStorage.items == undefined) {
        $sessionStorage.items = [];
      }
      //$localStorage.items = [];
      vm.itemCount = updateCartCount();

      $rootScope.$on('cartUpdated', function (event) {
        vm.itemCount = updateCartCount();
      });

      function updateCartCount() {
        var count = 0;
        $sessionStorage.items.forEach(function(product) {
           count += product.quantity;
        });

        return count;
      }
    }
  }

})();
