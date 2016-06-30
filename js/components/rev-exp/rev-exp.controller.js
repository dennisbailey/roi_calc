angular
  .module('roiCalcApp')
  .controller('RevExpCtrl', RevExpCtrl);

RevExpCtrl.$inject = ['$rootScope', 'revExpService'];

function RevExpCtrl($rootScope, revExpService) {

  var vm = this;
  
  // Default show/hide values
  vm.showAddRevenueBtn = true;
  vm.showAddRevenueForm = false;
  vm.showUpdateRevenueBtn = false;
  vm.showAddExpenseBtn = true;
  vm.showAddExpenseForm = false;
  
  // Functions to toggle between showing and hiding
  vm.toggleHideAddRevenue = function() {
    vm.showAddRevenueBtn = !vm.showAddRevenueBtn;
    vm.showAddRevenueForm = !vm.showAddRevenueForm;
  };
  
  vm.toggleHideAddExpense = function() {
    vm.showAddExpenseBtn = !vm.showAddExpenseBtn;
    vm.showAddExpenseForm = !vm.showAddExpenseForm;
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
  
  // Functions to edit an existing revenue or expense
  var preUpdateRevenue;
  var preUpdateExpense;
  
  vm.editRevenue = function(index) {
    vm.revenueIndex = index;
    vm.showUpdateRevenueBtn = true;
    vm.revenueFormTitle = 'Edit This Revenue Item';
    vm.formRevenue = revenueData[index];
    preUpdateRevenue = revenueData[index];
    console.log('edit fn ', preUpdateRevenue);
    vm.toggleHideAddRevenue();
  };
  
  vm.editExpense = function(index) {
    vm.expenseIndex = index;
    vm.showUpdateExpenseBtn = true;
    vm.expenseFormTitle = 'Edit This Expense Item';
    vm.formExpense = expenseData[index];
    preUpdateExpense = expenseData[index];
    vm.toggleHideAddExpense();
  };
  
  vm.updateRevenueItem = function() {
    revenueData[vm.revenueIndex] = vm.formRevenue;
    vm.formRevenue = {};
    vm.showUpdateRevenueBtn = false;
    vm.toggleHideAddRevenue();
    updateRevenueTotals();
    updateCalcs();
  };
  
  vm.updateExpenseItem = function() {
    rexpenseData[vm.expenseIndex] = vm.formExpense;
    vm.formExpense = {};
    vm.showUpdateExpenseBtn = false;
    vm.toggleHideAddExpense();
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
  
  
  // Functions to cancel adding or updating a revenue or expense
  vm.cancelRevenueAdd = function() {
    vm.formRevenue = {};
  };
  
  vm.cancelExpenseAdd = function() {
    vm.formExpense = {};
  };
  
  vm.cancelRevenueUpdate = function() {
    console.log(preUpdateRevenue);
    revenueData[vm.revenueIndex] = preUpdateRevenue;
    vm.revenueData = revenueData;
    vm.formRevenue = {};
    vm.showUpdateRevenueBtn = false;
    vm.toggleHideAddRevenue();
  };
  
  vm.cancelExpenseUpdate = function() {
    expenseData[vm.expenseIndex] = vm.preUpdateExpense;
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
