(function() {
  'use strict';

  describe('directive navbar', function() {

    var vm;

    beforeEach(function () {
      browser.get('/index.html');
    });

    xit('should filter category till 3 items', function () {
      var list = element.all(by.repeater('category in vm.categories'));
      expect(list.count()).toBe(3);
    });

    xit('should filter brands till 3 items', function () {
      var list = element.all(by.repeater('brand in vm.brands'));
      expect(list.count()).toBe(3);
    });

  });

})();
