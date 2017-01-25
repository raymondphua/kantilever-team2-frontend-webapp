(function() {
  'use strict';

  angular
    .module('app.authorization')
    .controller('RegistrationController', RegistrationController);

  /** @ngInject */
  function RegistrationController(AuthorizationService, $state) {
    var vm = this;

    vm.init = function () {
      vm.customer = { address: {}};
      vm.available = true;
      vm.passwordMatch = true;
    };

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
      AuthorizationService.registerUser(vm.customer).$promise.then(function() {
        AuthorizationService.login(vm.customer).$promise.then(function() {
          $state.go('home');
        });
      });
    }
  }
})();
