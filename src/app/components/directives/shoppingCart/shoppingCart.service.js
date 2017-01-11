(function() {
  'use strict';

  angular
    .module('app.directives')
    .service('ShoppingCartService', shoppingCartService);

  /** @ngInject */

  function shoppingCartService() {
    return {
      addToCart: addToCart,
      removeFromCart: removeFromCart
    };

    function addToCart(product, cart) {
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
  }
})();
