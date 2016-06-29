angular
  .module('roiCalcApp')
  .service('revExpService', revExpService);

revExpService.$inject = ['$rootScope'];

function revExpService($rootScope) {

  return {

    deleteRevenue : function(index) {
      revenueData.splice(index, 1);
      return revenueData;
    },

    deleteExpense : function(index) {
      expenseData.splice(index, 1);
      return expenseData;
    }
};

}
