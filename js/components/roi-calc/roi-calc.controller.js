angular
  .module('roiCalcApp')
  .controller('RoiCalcCtrl', RoiCalcCtrl);

RoiCalcCtrl.$inject = ['$rootScope'];

function RoiCalcCtrl($rootScope) {

  var vm = this;
  
  var updateRevenueTotals = function() {
    
    vm.revenuesOneTimeTotal = revenueData.reduce(function (total, obj) { return total + obj.oneTime; }, 0);
    vm.revenuesMonthlyTotal = revenueData.reduce(function (total, obj) { return total + obj.monthly; }, 0);
    vm.revenuesTotal = vm.revenuesOneTimeTotal + vm.revenuesMonthlyTotal * 12;

  };
  
  var updateExpenseTotals = function() {
    
    vm.expensesOneTimeTotal = expenseData.reduce(function (total, obj) { return total + obj.oneTime; }, 0);
    vm.expensesMonthlyTotal = expenseData.reduce(function (total, obj) { return total + obj.monthly; }, 0);
    vm.expensesTotal = vm.expensesOneTimeTotal + vm.expensesMonthlyTotal * 12;
    
  };
  
  var updateCalcs = function() {
    vm.contributionProfitMonthly = vm.revenuesMonthlyTotal - vm.expensesMonthlyTotal;
    vm.contributionProfitTotal = vm.revenuesTotal - vm.expensesTotal;
    vm.contributionMargin = 100 * vm.contributionProfitTotal / vm.revenuesTotal;
    vm.capitalRoi = (vm.expensesOneTimeTotal - vm.revenuesOneTimeTotal) / vm.contributionProfitMonthly;
    
  };
  
  // On page load, populate the inital values
  updateRevenueTotals();
  updateExpenseTotals();
  updateCalcs();

}
