/**
 * Created by orguz on 11/29/14.
 */
expensesApp.controller('LiveCtrl', ['$scope', '$modal', '$q', '$timeout','ExpenseService', 'ConfigurationService', function ($scope, $modal, $q, $timeout, ExpenseService, ConfigurationService) {

    $scope.expenses = {};
    $scope.categories = {};

    $scope.getData = function () {
        ExpenseService.getExpenses().then(function (data) {
            $scope.expenses = data.expenses;

            //ConfigurationService.getCategories().then(function (data) {
            //    $scope.categories = data.categories;
            //});

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
                categoriesDfr: function (ConfigurationService) {
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
                $timeout(function(newExpense){
                    $scope.expenses.push(newExpense);
                });
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
        labels: ['asd','dsa'],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(26,179,148,0.5)",
                strokeColor: "rgba(26,179,148,0.8)",
                highlightFill: "rgba(26,179,148,0.75)",
                highlightStroke: "rgba(26,179,148,1)",
                data: [3200, 800, 1120, 600]
            }
        ]
    };

}]);
