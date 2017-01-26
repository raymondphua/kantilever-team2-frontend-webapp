'use strict';

var registerPage = function () {
  browser.get('/register');
};

registerPage.prototype = Object.create({}, {
  email: { get: function () { return element(by.model('vm.customer.email')); }},
  typeEmail: { value: function (keys) { return this.email.sendKeys(keys); }},
  name: { get: function () { return element(by.model('vm.customer.name')); }},
  typeName: { value: function (keys) { return this.name.sendKeys(keys); }},
  phone: { get: function () { return element(by.model('vm.customer.phone')); }},
  typePhone: { value: function (keys) { return this.phone.sendKeys(keys); }},
  password: { get: function () { return element(by.model('vm.customer.password')); }},
  typePassword: { value: function (keys) { return this.password.sendKeys(keys); }},
  passwordRepeat: { get: function () { return element(by.model('vm.customer.passwordRepeat')); }},
  typePasswordRepeat: { value: function (keys) { return this.passwordRepeat.sendKeys(keys); }},
  street: { get: function () { return element(by.model('vm.customer.address.street')); }},
  typeStreet: { value: function (keys) { return this.street.sendKeys(keys); }},
  houseNumber: { get: function () { return element(by.model('vm.customer.address.houseNumber')); }},
  typeHouseNumber: { value: function (keys) { return this.houseNumber.sendKeys(keys); }},
  city: { get: function () { return element(by.model('vm.customer.address.city')); }},
  typeCity: { value: function (keys) { return this.city.sendKeys(keys); }},
  zip: { get: function () { return element(by.model('vm.customer.address.zip')); }},
  typeZip: { value: function (keys) { return this.zip.sendKeys(keys); }},
  registerButton: { get: function () { return element(by.css('.btn-signin')); }},
  register: { value: function () {
    this.registerButton.click();
  }}
});

module.exports = registerPage;
