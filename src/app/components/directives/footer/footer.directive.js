(function() {
  'use strict';

  angular
    .module('app.directives')
    .directive('footerBar', footer);

  /** @ngInject */
  function footer() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/directives/footer/footer.html',
      scope: {},
      controller: FooterController,
      controllerAs: 'vm',
      bindToController: true
    };

    /** @ngInject */
    function FooterController() {

    }
  }
})();
