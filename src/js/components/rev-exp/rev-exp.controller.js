angular
  .module('roiCalcApp')
  .controller('RevExpCtrl', RevExpCtrl);

RevExpCtrl.$inject = ['$rootScope'];

function RevExpCtrl($rootScope) {

  var vm = this;
  
  vm.revenues = revenuesData;
  vm.expenses = expensesData;

}
