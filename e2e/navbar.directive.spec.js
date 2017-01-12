(function() {
  'use strict';

  /**
   * @todo Complete the test
   * This example is not perfect.
   * Test should check if MomentJS have been called
   */
  describe('directive navbar', function() {

    var vm;

    beforeEach(function () {
      browser.get('/index.html');
    });

    it('should filter category till 3 items', function () {
      var list = element.all(by.repeater('category in vm.categories'));
      expect(list.count()).toBe(3);
    });

    it('should filter brands till 3 items', function () {
      var list = element.all(by.repeater('brand in vm.brands'));
      expect(list.count()).toBe(3);
    });

  });

})();
