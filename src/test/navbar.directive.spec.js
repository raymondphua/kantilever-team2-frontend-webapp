(function() {
  'use strict';

  /**
   * @todo Complete the test
   * This example is not perfect.
   * Test should check if MomentJS have been called
   */
  describe('directive navbar', function() {
    // var $window;
    var vm;
    var el;
    var timeInMs;

    beforeEach(module('feweb'));
    beforeEach(inject(function($compile, $rootScope) {
      // spyOn(_$window_, 'moment').and.callThrough();
      // $window = _$window_;

      el = angular.element('<navbar></navbar>');

      $compile(el)($rootScope.$new());
      $rootScope.$digest();
      vm = el.isolateScope().vm;
      // ctrl = el.controller('acmeNavbar');
    }));

    it('should be compiled', function() {
      expect(el.html()).not.toEqual(null);
    });

    // fit('should filter category till 3 items', function () {
    //   var catList = el.all(by.model('category in vm.categories'));
    //
    //   expect(catList.count()).toBe(9);
    // });

    // it('should filter brands till 3 items', function () {
    //   var brandList = el.all(by.repeater('brand in vm.brands'));
    //   expect(brandList.count()).toBe(3);
    // });

    // it('should have isolate scope object with instanciate members', function() {
    //   expect(vm).toEqual(jasmine.any(Object));
    //
    //   expect(vm.creationDate).toEqual(jasmine.any(Number));
    //   expect(vm.creationDate).toEqual(timeInMs);
    //
    //   expect(vm.relativeDate).toEqual(jasmine.any(String));
    //   expect(vm.relativeDate).toEqual('a day ago');
    // });

    // it('should call Moment', function() {
    //   expect($window.moment).toHaveBeenCalled();
    // });
  });


})();
