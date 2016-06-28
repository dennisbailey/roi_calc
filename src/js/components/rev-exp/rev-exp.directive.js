(function(){
  'use strict';

  angular
  .module('roiCalcApp')
  .directive('revExp', revExp);

function revExp() {
  return {
    restrict: 'E',
    templateUrl: 'js/components/rev-exp/rev-exp.view.html',
    controller: 'RevExpCtrl',
    controllerAs: 'vm',
    bindToController: true
  };
}
})();
