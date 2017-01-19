(function() {
  'use strict';

  angular
    .module('app.order')
    .controller("OrderController",orderController);

  /** @ngInject */

  function orderController(ShoppingCartService, OrderService, $rootScope, AuthorizationService, customer) {
    var vm = this;
    var uploadingOrder = false;

    vm.init = function () {
      vm.products = ShoppingCartService.getAllCartProducts();
      vm.productsTotalPrice = ShoppingCartService.getCartProductsTotalPrice();
      vm.productsTotalItems = ShoppingCartService.getCartProductsTotalItems();
      vm.shippingFee = 20;
      vm.customer = customer;

      vm.order = {
        totalPrice: (vm.productsTotalPrice + vm.shippingFee),
        shippingFee: vm.shippingFee,
        customer: vm.customer,
        orderedProducts: vm.products
      };
    };

    vm.confirmOrder = function () {
      if(!uploadingOrder){
        uploadingOrder = true;
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
          uploadingOrder = false;
        });
      }
    };
  }
})();
