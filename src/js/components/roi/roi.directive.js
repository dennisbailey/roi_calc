(function(){
  'use strict';

  angular
  .module('roiCalcApp')
  .directive('roi', roi);

function roi() {
  return {
    restrict: 'E',
    templateUrl: 'js/components/roi/roi.view.html',
    controller: 'RoiCtrl',
    controllerAs: 'vm',
    bindToController: true
  };
}
})();
