(function() {

  'use strict';

  angular.module('roiCalcApp', ['ngRoute'])
      
  .config(function($locationProvider) {
  
      // use the HTML5 History API
      $locationProvider.html5Mode(true);
  });

})();

