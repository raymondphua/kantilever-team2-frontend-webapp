(function() {
  'use strict';

  angular
    .module('app.order')
    .controller("OrderController",orderController);

  /** @ngInject */

  function orderController(ShoppingCartService, OrderService, $rootScope) {
    var vm = this;

    vm.init = function () {
      vm.products = ShoppingCartService.getAllCartProducts();
      vm.productsTotalPrice = ShoppingCartService.getCartProductsTotalPrice();
      vm.productsTotalItems = ShoppingCartService.getCartProductsTotalItems();
      vm.shippingFee = 100;
      vm.customer = {
          "id": "1",
          "name": "Jan Meesters",
          "email": "jan.meesters@gmail.com",
          "phone": "0612345678",
          "address": {
            "address": "Test straat 13",
            "city": "Breda",
            "zip": "1234AB"
          }
      };
      vm.order = {
        totalPrice: (vm.productsTotalPrice + vm.shippingFee),
        shippingFee: vm.shippingFee,
        customer: vm.customer,
        orderedProducts: vm.products,
        "deliveryAddress": {
        "address": "",
          "city": "",
          "zip": ""
      },
      "status": "BESTELD"
      }
    };

    vm.confirmOrder = function () {
      if(!vm.divergentDeliveryAddress){
        vm.order.deliveryAddress = vm.customer.address;
      }
      if(vm.invoiceAddressEqualsDeliveryAddress){
        vm.order.invoiceAddress = vm.order.deliveryAddress;
      }
      else{
        vm.order.invoiceAddress = vm.customer.address;
      }
      OrderService.createOrder(vm.order).$promise.then(function () {
        vm.activeTab = 1;
        $rootScope.$emit('cartUpdated', ShoppingCartService.clearCart());
        vm.products = [];
      });
    };
  }
})();
