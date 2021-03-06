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
    });

  });

})();
