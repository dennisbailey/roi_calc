(function() {

  'use strict';

  angular.module('roiCalcApp', ['ngRoute']);
  
  angular.module('roiCalcApp', [])
    
    .config(function($locationProvider) {
    
        // use the HTML5 History API
        $locationProvider.html5Mode(true);
    });

})();

