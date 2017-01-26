describe('Service shoppingcart', function() {

  var cart;
  var shoppingCartService;
  var $localStorage;

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
    cart = [{id : 1, quantity: 1, price: 5}, {id: 2, quantity: 1, price: 15}];
    inject(function(_ShoppingCartService_, _$localStorage_) {
      shoppingCartService = _ShoppingCartService_;
      $localStorage = _$localStorage_;
    });
    $localStorage.items = cart;
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

  it('Should give the right amount of products in the cart', function() {
    //ARRANGE
    var expected = 2;

    //ACT
    var total = shoppingCartService.getCartProductsTotalItems();

    //ASSERT
    expect(total).toBe(expected);
  });

  it('Should clear the cart and have a size of 0', function() {
    //ARRANGE
    var expected = 0;
    var total;

    //ACT
    shoppingCartService.clearCart();
    total = $localStorage.items.length;

    //ASSERT
    expect(total).toBe(expected);
  });

  it('Get all products should return all products in the cart', function() {
    //ARRANGE
    var expected = $localStorage.items;

    //ACT
    var products = shoppingCartService.getAllCartProducts();

    //ASSERT
    expect(products).toBe(expected);
  });

  it('Get total price should get the price of all products in the cart + quantity', function() {
    //ARRANGE
    var expected = 20;

    //ACT
    var totalPrice = shoppingCartService.getCartProductsTotalPrice();

    //ASSERT
    expect(totalPrice).toBe(expected);
  });

  it('Get total price should get the price of all products in the cart + quantity and apply the VAT', function() {
    //ARRANGE
    var expected = 24.2;

    //ACT
    var totalPrice = shoppingCartService.getCartProductsTotalPriceIncludingVat();

    //ASSERT
    expect(totalPrice).toBe(expected);
  });
});
