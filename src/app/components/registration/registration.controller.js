(function() {
  'use strict';

  angular
    .module('app.registration')
    .controller('RegistrationController', RegistrationController);

  /** @ngInject */
  function RegistrationController(AuthorizationService) {
    var vm = this;

    vm.customer = { address: {}};
    vm.available = true;
    vm.passwordMatch = true;

    vm.checkEmail = function() {
      if (vm.customer.email) {
        AuthorizationService.checkAvailableEmail(vm.customer.email).$promise.then(function(available) {
          vm.available = available.valid;
        });
      }
    };

    vm.checkPassword = function() {
      vm.passwordMatch = vm.customer.password === vm.customer.passwordRepeat;
    };

    vm.register = function() {
      console.log(vm.customer);
    }
  }
})();
