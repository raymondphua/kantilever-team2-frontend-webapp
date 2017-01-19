(function() {
  'use strict';

  angular
    .module('feweb')
    .constant('serviceBase', "http://localhost:11130/")
    .constant('serviceBaseAuthentication', "http://localhost:11150/");
})();
