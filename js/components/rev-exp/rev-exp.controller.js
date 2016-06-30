angular
  .module('roiCalcApp')
  .controller('RevExpCtrl', RevExpCtrl);

RevExpCtrl.$inject = ['$rootScope', 'revExpService'];

function RevExpCtrl($rootScope, revExpService) {

  var vm = this;
  
  // Default show/hide values
  vm.showAddRevenueBtn = true;
  vm.showRevenueForm = false;
  vm.showUpdateRevenueBtn = false;
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
  
  vm.toggleHideUpdateRevenue = function() {
    vm.showUpdateRevenueBtn = false;
    vm.showRevenueForm = !vm.showRevenueForm;
    vm.showAddRevenueBtn = !vm.showAddRevenueBtn;
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
//   var preUpdateRevenue;
//   var preUpdateExpense;
  
  vm.editRevenue = function(index) {
    vm.revenueIndex = index;
    vm.showUpdateRevenueBtn = true;
    vm.revenueFormTitle = 'Edit This Revenue Item';
    vm.formRevenue = revenueData[index];
    vm.preUpdateRevenue = revenueData[index];
    console.log('edit fn ', vm.preUpdateRevenue);
    vm.toggleHideAddRevenue();
  };
  
  vm.editExpense = function(index) {
    vm.expenseIndex = index;
    vm.showUpdateExpenseBtn = true;
    vm.expenseFormTitle = 'Edit This Expense Item';
    vm.formExpense = expenseData[index];
    vm.preUpdateExpense = expenseData[index];
    vm.toggleHideAddExpense();
  };
  
  // Functions to submit an update to a revenue or expense
  vm.submitRevenueUpdate = function() {
    revenueData[vm.revenueIndex] = vm.formRevenue;
    vm.formRevenue = {};
    vm.showUpdateRevenueBtn = false;
    updateRevenueTotals();
    updateCalcs();
  };
  
  vm.submitExpenseUpdate = function() {
    rexpenseData[vm.expenseIndex] = vm.formExpense;
    vm.formExpense = {};
    vm.showUpdateExpenseBtn = false;
    vm.toggleHideAddExpense();
    updateExpenseTotals();
    updateCalcs();
  };
  
  // Functions to cancel updating a revenue or expense
  vm.cancelRevenueUpdate = function() {
    console.log('cancel pre ', vm.preUpdateRevenue);
    console.log('index ', vm.revenueIndex);
    revenueData[vm.revenueIndex] = vm.preUpdateRevenue;
    vm.revenueData = revenueData;
    vm.formRevenue = {};
  };
  
  vm.cancelExpenseUpdate = function() {
    console.log('cancel pre ', vm.preUpdateExpense);
    expenseData[vm.expenseIndex] = vm.preUpdateExpense;
    vm.expenseData = expenseData;
    vm.formExpense = {};
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
