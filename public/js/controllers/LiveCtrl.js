/**
 * Created by orguz on 11/29/14.
 */
expensesApp.controller('LiveCtrl', ['$scope', '$modal', '$q', 'ExpenseService', 'ConfigurationService','_', function ($scope, $modal, $q, ExpenseService, ConfigurationService,_) {

    $scope.expenses = {};
    $scope.newExpense = {};
    $scope.categories = {};

    $scope.$watch(function(scope) { return scope.categories },
        function(newValue, oldValue) {
            $scope.barData.labels = newValue;
        }
    );

    $scope.getData = function () {
        ExpenseService.getExpenses().then(function (data) {
            $scope.expenses = data.expenses;
            var test = _.groupBy(data.expenses, function(expense){ return expense.category });


            ConfigurationService.getCategories().then(function (data) {
                //$scope.categories = $scope.barData.labels = data.categories;
                $scope.categories = data.categories;
            });

        }, function (rejectData) {
            console.log(rejectData);
        });
    };

    $scope.getData();

    $scope.openAddExpenseModal = function () {
        var modalInstance = $modal.open({
            templateUrl: '../../views/addExpenseModal.html',
            controller: 'ExpenseModalCtrl',
            resolve: {
                categoriesPromise: function (ConfigurationService) {
                    var deferred = $q.defer();
                    ConfigurationService.getCategories().then(function (categories) {
                        deferred.resolve(categories);
                    });
                    return deferred.promise;

                }
            }
        });


        modalInstance.result.then(function (newExpense) {
            ExpenseService.addExpense(newExpense).then(function (id) {
                console.log(newExpense);
                $scope.expenses.push(newExpense);
            }, function (rejectData) {
                console.log(rejectData);
            });
        }, function (msg) {
            console.log('Modal dismissed at: ' + new Date() + 'Message - ' + msg);
        });

    };

    $scope.jsonToDate = function (jsonDate) {
        var date = new Date(jsonDate);
        return date.toLocaleDateString();
    };

    $scope.barOptions = {
        scaleBeginAtZero: true,
        scaleShowGridLines: true,
        scaleGridLineColor: "rgba(0,0,0,.05)",
        scaleGridLineWidth: 1,
        barShowStroke: true,
        barStrokeWidth: 2,
        barValueSpacing: 5,
        barDatasetSpacing: 1
    };

    /**
     * Data for Bar chart
     */
    $scope.barData = {
        labels: {},
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(26,179,148,0.5)",
                strokeColor: "rgba(26,179,148,0.8)",
                highlightFill: "rgba(26,179,148,0.75)",
                highlightStroke: "rgba(26,179,148,1)",
                data: [1,2,3]
            }
        ]
    };

}]);
