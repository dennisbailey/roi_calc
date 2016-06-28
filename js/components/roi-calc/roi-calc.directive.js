(function(){
  'use strict';

  angular
  .module('roiCalcApp')
  .directive('roiCalc', roiCalc);

function roiCalc() {
  return {
    restrict: 'E',
    templateUrl: 'js/components/roi-calc/roi-calc.view.html',
    controller: 'RoiCalcCtrl',
    controllerAs: 'vm',
    bindToController: true
  };
}
})();
