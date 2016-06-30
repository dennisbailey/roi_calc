var RevExpCtrl;

RevExpCtrl = function($scope) {
  
  // Seed data
  $scope.revenueData = [ { 
                           description : 'Item 1',
                           oneTime : 100, 
                           monthly : 50
                         },
                         { 
                           description : 'Item 2',
                           oneTime : 50, 
                           monthly : 25
                         },
                         { 
                           description : 'Item 3',
                           oneTime : 25, 
                           monthly : 85
                         },
                       ];
               
  $scope.expenseData = [ { 
                           description : 'Item 1',
                           oneTime : 500, 
                           monthly : 20
                         },
                         { 
                           description : 'Item 2',
                           oneTime : 200, 
                           monthly : 40
                         }
                       ];
  
  // Default show/hide values
  $scope.showAddRevenueBtn = true;
  $scope.showRevenueForm = false;
  $scope.showAddExpenseBtn = true;
  $scope.showExpenseForm = false;
  
  // Functions to toggle between showing and hiding
  $scope.toggleHideAddRevenue = function() {
    $scope.showAddRevenueBtn = !$scope.showAddRevenueBtn;
    $scope.showRevenueForm = !$scope.showRevenueForm;
  };
  
  $scope.toggleHideAddExpense = function() {
    $scope.showAddExpenseBtn = !$scope.showAddExpenseBtn;
    $scope.showExpenseForm = !$scope.showExpenseForm;
  };
  
  
  // Functions to delete revenue and expense line items
  $scope.deleteRevenue = function(index) {
    $scope.revenueData = revExpService.deleteRevenue(index);
    updateRevenueTotals();
    updateCalcs();
  };
  
  $scope.deleteExpense = function(index) {
    $scope.expenseData = revExpService.deleteExpense(index);
    updateExpenseTotals();
    updateCalcs();
  };
  
  
  // Functions to add a new revenue or expense to the data
  $scope.submitRevenueAdd = function() {
    $scope.revenueData.push($scope.formRevenue);
    $scope.formRevenue = {};
    updateRevenueTotals();
    updateCalcs();
  };
  
  $scope.submitExpenseAdd = function() {
    $scope.expenseData.push($scope.formExpense);
    $scope.formExpense = {};
    updateExpenseTotals();
    updateCalcs();
  };
  
  
  // Functions to cancel adding a revenue or expense
  $scope.cancelRevenueAdd = function() {
    $scope.formRevenue = {};
  };
  
  $scope.cancelExpenseAdd = function() {
    $scope.formExpense = {};
  };
  
  // Functions to update the calculations on the page
  var updateRevenueTotals = function() {
    $scope.revenuesOneTimeTotal = $scope.revenueData.reduce(function (total, obj) { return total + obj.oneTime; }, 0);
    $scope.revenuesMonthlyTotal = $scope.revenueData.reduce(function (total, obj) { return total + obj.monthly; }, 0);
    $scope.revenuesTotal = $scope.revenuesOneTimeTotal + $scope.revenuesMonthlyTotal * 12;
  };
  
  var updateExpenseTotals = function() {
    $scope.expensesOneTimeTotal = $scope.expenseData.reduce(function (total, obj) { return total + obj.oneTime; }, 0);
    $scope.expensesMonthlyTotal = $scope.expenseData.reduce(function (total, obj) { return total + obj.monthly; }, 0);
    $scope.expensesTotal = $scope.expensesOneTimeTotal + $scope.expensesMonthlyTotal * 12;
  };
  
  var updateCalcs = function() {
    $scope.contributionProfitMonthly = $scope.revenuesMonthlyTotal - $scope.expensesMonthlyTotal;
    $scope.contributionProfitTotal = $scope.revenuesTotal - $scope.expensesTotal;
    $scope.contributionMargin = 100 * $scope.contributionProfitTotal / $scope.revenuesTotal;
    $scope.capitalRoi = ($scope.expensesOneTimeTotal - $scope.revenuesOneTimeTotal) / $scope.contributionProfitMonthly;
  };
  
  // On page load, populate the inital values
  updateRevenueTotals();
  updateExpenseTotals();
  updateCalcs();

  var revExpService = {
    
    deleteRevenue : function(index) {
        $scope.revenueData.splice(index, 1);
        return $scope.revenueData;
    },
  
    deleteExpense : function(index) {
        $scope.expenseData.splice(index, 1);
        return $scope.expenseData;
    }
    
  }

};



angular.module("roiCalcApp", []).controller("RevExpCtrl", RevExpCtrl);