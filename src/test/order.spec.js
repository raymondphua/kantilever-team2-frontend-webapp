describe('Controller: OrderController', function() {
  var controller, $httpBackend, orderService;
  var orderUrl = 'http://localhost:11130/orderservice/orders';
  var getOrderUrl = 'http://localhost:11130/orderservice/orders/1';

  var responseConfig = {
    headers: {
      location: 'http://localhost:11130/orderservice/orders/1'
    }
  };
  beforeEach(function () {
    module('feweb');
    inject(function($controller, $rootScope, _$httpBackend_, _OrderService_) {
      controller = $controller('OrderController', { customer: {}});
      $httpBackend = _$httpBackend_;
      orderService = _OrderService_;
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should make an order', function() {
    controller.order = {};
    controller.customer = { address: {}};

    controller.confirmOrder();

    $httpBackend.expectPOST(orderUrl).respond(201, {}, responseConfig.headers);
    $httpBackend.expectGET(getOrderUrl).respond(200, { id: 1 });

    $httpBackend.flush();

    expect(controller.order.id).toBe(1);
  });
});
