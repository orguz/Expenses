/**
 * Created by orguz on 11/29/14.
 */
expensesApp.controller('LiveCtrl', ['$scope', '$modal', '$q', 'ExpenseService', 'ConfigurationService','_', function ($scope, $modal, $q, ExpenseService, ConfigurationService,_) {

    $scope.newExpense = {};
    $scope.expenses = [];
    $scope.categories = {};


    $scope.getData = function () {
        ExpenseService.getExpenses().then(function (data) {
            console.log('1');

            $scope.expenses = data.expenses;
            console.log('2');


            //var test = _.groupBy(data.expenses, function (expense) {
            //    return expense.category
            //});
            ConfigurationService.getCategories().then(function (data) {
                $scope.categories = data.categories;
                console.log('3');

                //$scope.barData.labels = data.categories;

                //var keys = _.keys(test);
                //$scope.barData = Array.apply(null, new Array($scope.labels.length)).map(Number.prototype.valueOf, 0);

                //
                //_.each(keys, function (element, index, array) {
                //    var sum = 0;
                //    _.each(test[element], function (element, index, array) {
                //        sum += element.value;
                //    });
                //    $scope.barData[_.indexOf($scope.labels, element)] = sum;
                //});

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
                //$scope.data[_.indexOf($scope.labels, newExpense.category)] += newExpense.value;
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


}]);
