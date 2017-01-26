'use strict';

var catalogPage = function () {
  browser.get('/catalog');
};

catalogPage.prototype = Object.create({}, {
  categories: {get: function(){return element.all(by.repeater('category in vm.categories'));}},
  categoryByPosition: {value: function(position){return element(by.repeater('category in vm.categories').row(position));}},
  tickCategory: { value: function (position) {
    element(by.repeater('category in vm.categories').row(position)).click();
  }},
  brands: {get: function(){return element.all(by.repeater('brand in vm.brands | limitTo:vm.brandFilterLimit'));}},
  brandByPosition: {value: function(position){return element(by.repeater('brand in vm.brands | limitTo:vm.brandFilterLimit').row(position));}},
  brandCount : {get: function(){return element.all(by.repeater('brand in vm.brands | limitTo:vm.brandFilterLimit')).count();}},
  tickBrand: { value: function (position) {
    element(by.repeater('brand in vm.brands | limitTo:vm.brandFilterLimit').row(position)).click();
  }},
  brandMoreButton :{get: function(){return element(by.css('#brand-filter-more'));}},
  brandMoreButtonClick: { value: function () {
    this.brandMoreButton.click();
  }},
  brandLessButtonClick: { value: function () {
    this.brandLessButton.click();
  }},
  brandLessButton :{get: function(){return element(by.css('#brand-filter-less'));}},
  priceSlider: {get: function(){return element(by.css('.rz-pointer'));}},
  products : {get: function(){return element(by.repeater('product in vm.listItems'));}},
  productByPosition: {value: function(position){return element(by.repeater('product in vm.listItems').row(position));}},
  productsCount : {get: function(){return element.all(by.repeater('product in vm.listItems')).count();}}
});

module.exports = catalogPage;
