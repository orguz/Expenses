/**
 * Created by orguz on 11/29/14.
 */
expensesApp.controller('ExpenseModalCtrl', ['$scope', '$modalInstance', 'categoriesDfr', function ($scope, $modalInstance, categoriesDfr) {
    $scope.newExpense = {};
    $scope.defaultCategory = "Category";
    $scope.categories = categoriesDfr.categories;

    $scope.addExpense = function () {
        if (isFormValid()){
            $modalInstance.close($scope.newExpense);
        }
    };

    $scope.cancel = function () {
        console.log("cancel");
        $modalInstance.dismiss("Cancel was pressed");

    };


    var isFormValid = function(){
        var result = true;
        if ($scope.newExpense.title == undefined || $scope.newExpense.description == undefined || $scope.newExpense.date == undefined || $scope.newExpense.category == undefined || $scope.newExpense.value == undefined){
            result = false;
        }
        return result;
    };


}]);
