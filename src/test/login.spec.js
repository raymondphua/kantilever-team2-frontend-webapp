describe('Controller: LoginController', function() {
  var controller, $httpBackend, authService;
  var baseUrl = 'http://localhost:11150/oauth/token';
  var customerEmailUrl = "http://localhost:11130/customerservice/customers?email=pieter@hotmail.com";

  beforeEach(function () {
    module('feweb');
    inject(function($controller, $rootScope, _$httpBackend_, _AuthorizationService_) {
      controller = $controller('LoginController');
      $httpBackend = _$httpBackend_;
      authService = _AuthorizationService_;
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should retrieve a token', function() {
    controller.user = { email: "pieter@hotmail.com", password: "henkie"};
    controller.login();

    $httpBackend.expectPOST(baseUrl).respond(200, {
      "access_token": "ec10ebb3-ddf9-4d72-b37c-4db6961f80d6",
      "token_type": "bearer",
      "refresh_token": "b3a50adf-3a55-4b48-a6ca-e16cae65d5a7",
      "expires_in": 4499,
      "scope": "trust read write"
    });

    $httpBackend.expectGET(customerEmailUrl).respond(200, [{}]);
    $httpBackend.flush();

    expect(authService.getToken()).toBe('bearer ec10ebb3-ddf9-4d72-b37c-4db6961f80d6');
  });
});
