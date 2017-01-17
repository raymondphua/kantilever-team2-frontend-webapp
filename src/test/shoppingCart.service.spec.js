describe('Service shoppingcart', function() {

  var cart;
  var shoppingCartService;

  function findProduct(product) {
    var found = null;

    cart.forEach(function(prod) {
      if(product.id == prod.id) {
        found = prod;
      }
    });
    return found;
  }

  beforeEach(function() {
    module('feweb');
    cart = [{id : 1, quantity: 1}, {id: 2, quantity: 1}];
    inject(function(_ShoppingCartService_) {
      shoppingCartService = _ShoppingCartService_;
    });
  });

  it('Should add a new product to the cart', function() {
    //ARRANGE
    var product = { id: cart.length + 1};
    var oldLength = cart.length;

    //ACT
    shoppingCartService.addToCart(product, cart);

    //ASSERT
    expect(cart.length).toBe(oldLength + 1);
  });

  it('Should not increase the array size when adding the same product', function() {
    //ARRANGE
    var product = { id:2, quantity: 1};
    var oldLength = cart.length;
    var oldProductQuantity = findProduct(product).quantity;

    //ACT
    shoppingCartService.addToCart(product, cart);
    var newProductQuantity = findProduct(product).quantity;

    //ASSERT
    expect(cart.length).toBe(oldLength);
    expect(newProductQuantity).toBe(oldProductQuantity + 1);
  });

  it('Should decrease the quantity amount if the product quantity is higher than 1', function() {
    //ARRANGE
    var product = { id:2, quantity: 1};
    var oldLength = cart.length;

    //ACT
    shoppingCartService.addToCart(product, cart);
    shoppingCartService.addToCart(product, cart);
    var oldProductQuantity = findProduct(product).quantity;

    shoppingCartService.removeFromCart(product, cart);
    var newProductQuantity = findProduct(product).quantity;

    //ASSERT
    expect(cart.length).toBe(oldLength);
    expect(newProductQuantity).toBe(oldProductQuantity - 1);
  });

  it('Should the product from the cart if the quantity is 1 and being removed', function() {
    //ARRANGE
    var product = { id:2, quantity: 1};
    var oldLength = cart.length;

    //ACT
    shoppingCartService.removeFromCart(product, cart);

    //ASSERT
    expect(cart.length).toBe(oldLength - 1);
  });
});
