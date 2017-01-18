(function() {
  'use strict';

  angular
    .module('app.authorization')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController(AuthorizationService, $state, ShoppingCartService) {
      var vm = this;

      vm.login = function(){
        AuthorizationService.login(vm.user).$promise.then(function(){
          if(ShoppingCartService.getCartProductsTotalItems.length > 0){
            $state.go("order");
          }
          else{
            $state.go("shoppingCartDetail");
          }
        },function(){
          vm.error = "Gebruikersnaam en/of wachtwoord is onjuist.";
        });
      };

    // vm.signUp = function(){
    //   AuthorizationService.signUp(self.user).$promise.then(function(data){
    //     AuthorizationService.getCurrentUser().then(function(){
    //       $state.go("order");
    //     });
    //   },function(error){
    //     if(error.data.message){
    //       self.error = error.data.message;
    //     }
    //   });
    // };
  }
})();

