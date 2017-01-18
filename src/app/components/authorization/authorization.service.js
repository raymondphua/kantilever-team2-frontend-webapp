(function() {
  'use strict';

  angular
    .module('app.authorization')
    .service("AuthorizationService", authorizationService);

  /** @ngInject */

  function authorizationService(ResourceService, $http, $localStorage, PermPermissionStore, $rootScope, serviceBaseAuthentication, $httpParamSerializer) {

    return {
      getToken: getToken,
      setToken: setToken,
      isLoggedIn: isLoggedIn,
      getCurrentUser: getCurrentUser,
      login: login,
      logout: logout,
      setUser: setUser
      // signUp: signUp
    };

    function getToken(){
      return $localStorage.Authorization;
    }

    function setToken(token) {
      return $localStorage.Authorization = token;
    }

    function setUser(username) {
      $localStorage.username = username;
      $rootScope.user = username;
    }

    function isLoggedIn(){
      return $localStorage.Authorization;
    }

    function getCurrentUser(){
      return $localStorage.username;
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
          setUser(user.email);
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

    // function signUp(user){
    //   return ResourceService('/auth/signup').save(user, function(data){
    //     if(data.token){
    //       setToken(data.token);
    //       $http.defaults.headers.common['Authorization']= data.token;
    //     }
    //   });
    // }
  }
})();
