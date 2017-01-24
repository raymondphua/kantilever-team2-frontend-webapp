(function() {
  'use strict';

  angular
    .module('app.registration')
    .controller('RegistrationController', RegistrationController);

  /** @ngInject */
  function RegistrationController() {
    var vm = this;

    vm.customer = { address: {}};
    vm.available = false;

    vm.checkEmail = function() {
      vm.available = !vm.available;
    };

    vm.checkPassword = function() {
      if (vm.customer.password === vm.customer.passwordRepeat) {
        return true;
      }
      return false;
    };

    vm.register = function() {
      console.log(vm.customer);
    }
  }
})();
