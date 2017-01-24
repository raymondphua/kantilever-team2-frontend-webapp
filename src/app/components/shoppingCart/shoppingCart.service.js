(function() {
  'use strict';

  angular
    .module('app.shoppingCart')
    .service('ShoppingCartService', shoppingCartService);

  /** @ngInject */

  function shoppingCartService($localStorage) {
    return {
      addToCart: addToCart,
      removeFromCart: removeFromCart,
      findProductInCart: findProductInCart,
      getAllCartProducts: getAllCartProducts,
      getCartProductsTotalPrice: getCartProductsTotalPrice,
      getCartProductsTotalPriceIncludingVat: getCartProductsTotalPriceIncludingVat,
      getCartProductsTotalItems: getCartProductsTotalItems,
      clearCart: clearCart
    };

    function addToCart(product, cart) {
      if(!cart){
        cart = $localStorage.items;
      }
      var inCartProduct = findProductInCart(product, cart);
      if (inCartProduct != null) {
        inCartProduct.quantity++;
      } else {
        product.quantity = 1;
        cart.push(product);
      }
    }

    function removeFromCart(toRemoveProduct, cart) {
      cart.forEach(function(product, index) {
        if(toRemoveProduct.id == product.id) {
          if (product.quantity > 1) {
            product.quantity--;
          } else {
            cart.splice(index, 1);
          }
        }
      });
    }

    function findProductInCart(toFindProduct, cart) {
      var returnProduct = null;
      cart.forEach(function(product) {
        if (toFindProduct.id == product.id) {
          returnProduct = product;
        }
      });

      return returnProduct;
    }

    function getAllCartProducts() {
      if($localStorage.items){
        var products = $localStorage.items;
        products.forEach(function (product) {
          product.totalPrice = product.price * product.quantity;
        });

        return products;
      }
      else{
        return [];
      }
    }


    function getCartProductsTotalPrice() {
      var total = 0;
      $localStorage.items.forEach(function(product) {
        total += product.quantity * product.price;
      });
      return total;
    }

    function getCartProductsTotalPriceIncludingVat() {
      var total = 0;
      $localStorage.items.forEach(function(product) {
        total += product.quantity * product.price * 1.21;
      });

      return total;
    }


    function getCartProductsTotalItems() {
      var count = 0;
      $localStorage.items.forEach(function(product) {
        count += product.quantity;
      });

      return count;
    }

    function clearCart() {
        $localStorage.items = [];
    }
  }
})();
