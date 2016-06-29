angular
  .module('roiCalcApp')
  .controller('RevExpCtrl', RevExpCtrl);

RevExpCtrl.$inject = ['$rootScope', 'revExpService'];

function RevExpCtrl($rootScope, revExpService) {

  var vm = this;
  
  // Attach the revenue and expense data to the scope
  vm.revenueData = revenueData;
  vm.expenseData = expenseData;
  
  vm.deleteRevenue = function(index) {
    vm.revenueData = revExpService.deleteRevenue(index);
    updateRevenueTotals();
    updateCalcs();
  };
  
  vm.deleteExpense = function(index) {
    vm.expenseData = revExpService.deleteExpense(index);
    updateExpenseTotals();
    updateCalcs();
  };
  
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
