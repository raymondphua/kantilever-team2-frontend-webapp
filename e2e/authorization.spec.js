(function() {
  'use strict';

  var LoginPage = require('./pages/login.page.js');

  describe('Authorization', function() {

    var page;

    beforeEach(function () {
      page = new LoginPage();
    });

    fit('entering correct username and password should set the username in the header', function () {

      page.typeUsername("pieter@hotmail.com");
      page.typePassword("henkie");
      page.login();

      expect(element(by.id('username')).getText()).toEqual('pieter@hotmail.com');
    });

    fit('entering invalid username and password should show an error message', function () {

      page.typeUsername("pieter@hotmail.com");
      page.typePassword("henkie");
      page.login();

      expect(element(by.id('username')).getText()).toEqual('pieter@hotmail.com');
    });

  });

})();
