(function() {
  'use strict';

  angular
    .module('app.authorization')
    .service("AuthorizationService", authorizationService);

  /** @ngInject */

  function authorizationService(ResourceService, $http, $q, $localStorage, PermPermissionStore, $rootScope, serviceBase, serviceBaseAuthentication, $httpParamSerializer) {

    return {
      getToken: getToken,
      setToken: setToken,
      isLoggedIn: isLoggedIn,
      getCurrentUser: getCurrentUser,
      getUserByEmail: getUserByEmail,
      login: login,
      logout: logout,
      setUser: setUser,
      checkAvailableEmail: checkAvailableEmail
    };

    function getToken(){
      return $localStorage.Authorization;
    }

    function setToken(token) {
      return $localStorage.Authorization = token;
    }

    function setUser(user) {
      $localStorage.username = user.email;
      $rootScope.user = user;
    }

    function isLoggedIn(){
      if(!$localStorage.Authorization){
        return false
      }
      else{
        return true;
      }
    }

    function getCurrentUser(){
      if(!$localStorage.username){return $q.when(null)}

      return getUserByEmail($localStorage.username);
    }

    function getUserByEmail(email) {
      var defered = $q.defer();
      ResourceService(serviceBase + "customerservice/customers", {email:  email}).query().$promise.then(function (users) {
        defered.resolve(users[0]);
      }, function(error){
        defered.reject(error);
      });

      return defered.promise;
    }

    function login(user){
      var requestParams = {
        grant_type : "password",
        username: user.email,
        password: user.password,
        client_id: "kantilever",
        client_secret: "kantiSecret"
      };

      return ResourceService(serviceBaseAuthentication + 'oauth/token').saveAsFormEncoded($httpParamSerializer(requestParams),function(data){
        if(data.access_token){
          setToken(data.token_type + " " + data.access_token);
          getUserByEmail(user.email).then(function (user) {
            setUser(user);
          });
          $http.defaults.headers.common['Authorization']= data.token_type + " " + data.access_token;
          PermPermissionStore.definePermission('user', function(){
            return true;
          })
        }
        return data;
      });
    }

    function logout(){
      $localStorage.Authorization = undefined;
      $localStorage.username = undefined;
      $rootScope.user = null;
      PermPermissionStore.removePermissionDefinition('user');
      $http.defaults.headers.common['Authorization']= undefined;
    }

    function checkAvailableEmail(email) {
      return ResourceService(serviceBase + "customerservice/customers/validate/email").post({email:  email});
    }

    function registerUser(user) {
      return ResourceService(serviceBase + "customerservice/customers").post(user);
    }
  }
})();
