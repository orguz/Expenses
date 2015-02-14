'use strict';

expensesApp.factory('ExpenseService', function ($http, $q) {

    var service = {
        addExpense: function (expenseData) {

            var dfr = $q.defer();
            $http.post('/expense/addExpense', {expense: expenseData}).success(function (data, status, header, config) {
                dfr.resolve(data);

            }).error(function (data, status, header, config) {
                dfr.reject(data);
            });

            return dfr.promise;

        },

        getExpenses: function () {

            var dfr = $q.defer();
            $http.get('/expense/getExpenses').success(function (data, status, header, config) {
                dfr.resolve(data);

            }).error(function (data, status, header, config) {
                dfr.reject(data);
            });

            return dfr.promise;

        }


    };


    return service;
});