(function() {

  'use strict';

  angular
    .module('roiCalcApp')
    .config(appConfig);

  appConfig.$inject = ['$routeProvider', '$locationProvider', '$httpProvider'];

  function appConfig($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
    .when('/', {
      template: '<roi></roi>'
    })

    .otherwise({redirectTo: '/'});

  }

})();