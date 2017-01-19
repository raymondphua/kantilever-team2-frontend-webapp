'use strict';

var loginPage = function () {
  browser.get('/login');
};

loginPage.prototype = Object.create({}, {
  username: { get: function () { return element(by.model('vm.user.email')); }},
  typeUsername: { value: function (keys) { return this.username.sendKeys(keys); }},
  password: { get: function () { return element(by.model('vm.user.password')); }},
  typePassword: { value: function (keys) { return this.password.sendKeys(keys); }},
  loginButton: { get: function () { return element(by.css('.btn-signin')); }},
  login: { value: function () {
    this.loginButton.click();
  }}
});

module.exports = loginPage;
