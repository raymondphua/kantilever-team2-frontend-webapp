(function() {
  'use strict';

  var CatalogPage = require('./pages/catalogOverview.page.js');

  describe('Authorization', function() {

    var page;

    beforeEach(function () {
      page = new CatalogPage();
    });

    it('ticking one category filter should show a list filtered by the selected category', function () {

      page.tickCategory(0);

      browser.wait(function() {
        return page.productsCount.then(function (count) {
            return count == 3;
          });
      }, 8000);

      expect(page.categoryByPosition(0).element(by.css('input')).isSelected()).toBeTruthy();
      expect(page.productByPosition(0).element(by.css('.category-name')).getText()).toEqual("ROAD-150 RED, 62");
      expect(page.productsCount).toEqual(3);
    });

    it('ticking two categories filters should show a list filtered by the selected categories', function () {

      page.tickCategory(3);
      page.tickCategory(4);

      browser.wait(function() {
        return page.productsCount.then(function (count) {
          return count == 3;
        });
      }, 8000);

      expect(page.categoryByPosition(3).element(by.css('input')).isSelected()).toBeTruthy();
      expect(page.categoryByPosition(4).element(by.css('input')).isSelected()).toBeTruthy();
      expect(page.productByPosition(0).element(by.css('.category-name')).getText()).toEqual("CYCLUS LAKSTIFT MAT WIT");
      expect(page.productByPosition(2).element(by.css('.category-name')).getText()).toEqual("Selle Royal zadel 5132 unisex Respiro soft Relaxed zwart".toUpperCase());
      expect(page.productsCount).toEqual(3);
    });

    it('ticking a brand filter should show a list filtered by the selected brand', function () {

      page.tickBrand(0);

      browser.wait(function() {
        return page.productsCount.then(function (count) {
          return count == 2;
        });
      }, 8000);

      expect(page.brandByPosition(0).element(by.css('input')).isSelected()).toBeTruthy();
      expect(page.productByPosition(0).element(by.css('.category-name')).getText()).toEqual("Road-150 Red, 62".toUpperCase());
      expect(page.productByPosition(1).element(by.css('.category-name')).getText()).toEqual("ML Fork".toUpperCase());
      expect(page.productsCount).toEqual(2);
    });

    it('ticking a brand filter and a category filter should show a list filtered by the selected brand and category', function () {

      page.tickBrand(0);
      page.tickCategory(0);

      browser.wait(function() {
        return page.productsCount.then(function (count) {
          return count == 1;
        });
      }, 8000);

      expect(page.brandByPosition(0).element(by.css('input')).isSelected()).toBeTruthy();
      expect(page.categoryByPosition(0).element(by.css('input')).isSelected()).toBeTruthy();
      expect(page.productByPosition(0).element(by.css('.category-name')).getText()).toEqual("Road-150 Red, 62".toUpperCase());
      expect(page.productsCount).toEqual(1);
    });

    it('moving the price slider to €10 should show a list of products with a price =< 10', function () {

      var slider = element(by.css('.rz-pointer'));

      browser.actions().dragAndDrop(
        slider,
        {x:-170, y:0}
      ).perform();

      expect(page.productsCount).toEqual(2);
    });


    it('only up to 10 brands should be shown when the "meer" button is not pressed yet', function () {
      expect(page.productsCount).toBeLessThan(11);
    });

    it('Pressing the brands "meer" and "less" buttons should show more than 10 brands and up to 10 brands', function () {
      page.brandMoreButtonClick();
      expect(page.brandCount).toBeGreaterThan(10);
      page.brandLessButtonClick();
      expect(page.brandCount).toBeLessThan(11);
    });

  });

})();
