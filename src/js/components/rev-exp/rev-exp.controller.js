angular
  .module('roiCalcApp')
  .controller('RevExpCtrl', RevExpCtrl);

RevExpCtrl.$inject = ['$rootScope', 'revExpService'];

function RevExpCtrl($rootScope, revExpService) {

  var vm = this;

  // Default show/hide values
  vm.showAddRevenueBtn = true;
  vm.showRevenueForm = false;
  vm.showAddExpenseBtn = true;
  vm.showExpenseForm = false;

  // Functions to toggle between showing and hiding
  vm.toggleHideAddRevenue = function() {
    vm.showAddRevenueBtn = !vm.showAddRevenueBtn;
    vm.showRevenueForm = !vm.showRevenueForm;
  };

  vm.toggleHideAddExpense = function() {
    vm.showAddExpenseBtn = !vm.showAddExpenseBtn;
    vm.showExpenseForm = !vm.showExpenseForm;
  };

  // Attach the revenue and expense data from data.js to the scope
  vm.revenueData = revenueData;
  vm.expenseData = expenseData;


  // Functions to delete revenue and expense line items
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


  // Functions to add a new revenue or expense to the data
  vm.submitRevenueAdd = function() {
    revenueData.push(vm.formRevenue);
    vm.formRevenue = {};
    updateRevenueTotals();
    updateCalcs();
  };

  vm.submitExpenseAdd = function() {
    expenseData.push(vm.formExpense);
    vm.formExpense = {};
    updateExpenseTotals();
    updateCalcs();
  };


  // Functions to cancel adding a revenue or expense
  vm.cancelRevenueAdd = function() {
    vm.formRevenue = {};
  };

  vm.cancelExpenseAdd = function() {
    vm.formExpense = {};
  };

  // Functions to update the calculations on the page
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
