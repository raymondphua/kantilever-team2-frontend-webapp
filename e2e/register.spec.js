(function() {
  'use strict';

  var RegisterPage = require('./pages/register.page.js');

  describe('Register', function() {

    var page;

    beforeEach(function () {
      page = new RegisterPage();
    });

    fit('entering correct input should set all the fields', function () {

      page.typeEmail("test@email.com");
      page.typeName("Test");
      page.typePhone("0612345678");
      page.typePassword("test");
      page.typePasswordRepeat("test");
      page.typeStreet("test");
      page.typeHouseNumber("23");
      page.typeCity("Den Bosch");
      page.typeZip("1234AB");

      expect(page.email.getAttribute('value')).toEqual('test@email.com');
      expect(page.name.getAttribute('value')).toEqual('Test');
      expect(page.phone.getAttribute('value')).toEqual('0612345678');
      expect(page.password.getAttribute('value')).toEqual('test');
      expect(page.passwordRepeat.getAttribute('value')).toEqual('test');
      expect(page.street.getAttribute('value')).toEqual('test');
      expect(page.houseNumber.getAttribute('value')).toEqual('23');
      expect(page.city.getAttribute('value')).toEqual('Den Bosch');
      expect(page.zip.getAttribute('value')).toEqual('1234AB');
    });

    fit('entering existing email should show error span', function () {

      page.typeEmail("pieter@hotmail.com");
      page.typeName("test");

      expect(page.email.getAttribute('value')).toEqual('pieter@hotmail.com');
      expect(element(by.id('emailInUse')).getText()).toEqual('Dit emailadres is al in gebruik');
    });

    fit('Submitting an empty form should show errors for all fields', function () {

      page.register();

      expect(element(by.id('emailRequired')).getText()).toEqual('Vul een geldig emailadres in');
      expect(element(by.id('nameRequired')).getText()).toEqual('Naam veld is verplicht');
      expect(element(by.id('phoneRequired')).getText()).toEqual('Vul een geldige telefoonnummer in');
      expect(element(by.id('passRequired')).getText()).toEqual('Wachtwoord veld is verplicht');
      expect(element(by.id('passRepeatRequired')).getText()).toEqual('Bevestig Wachtwoord veld is verplicht');
      expect(element(by.id('streetRequired')).getText()).toEqual('Straat veld is verplicht');
      expect(element(by.id('houseNumberRequired')).getText()).toEqual('Huisnummer is verplicht');
      expect(element(by.id('cityRequired')).getText()).toEqual('Plaats is verplicht');
      expect(element(by.id('zipRequired')).getText()).toEqual('Postcode is verplicht');
    });

    fit('If passwords dont match, show error', function () {

      page.typePassword("test");
      page.typePasswordRepeat("te");
      page.typeStreet("test");

      expect(element(by.id('passNoMatch')).getText()).toEqual('Wachtwoord komt niet overeen');
    });
  });

})();
