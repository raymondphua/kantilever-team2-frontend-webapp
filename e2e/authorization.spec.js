(function() {
  'use strict';

  var LoginPage = require('./pages/login.page.js');

  describe('Authorization', function() {

    var page;

    beforeEach(function () {
      page = new LoginPage();
    });

    it('entering correct username and password should set the username in the header', function () {
      page.typeUsername("pieter@hotmail.com");
      page.typePassword("henkie");
      page.login();

      expect(element(by.id('username')).getText()).toEqual('pieter@hotmail.com');

      element(by.id('logout')).click();
    });

    it('entering incorrect username and password should show an error message', function () {
      page.typeUsername("pietertje@hotmail.com");
      page.typePassword("henkies");
      page.login();

      expect(element(by.css('.notification-list')).all(by.css('li')).get(2).getText()).toEqual("Gebruikersnaam en/of wachtwoord is onjuist.");
    });
  });

})();
