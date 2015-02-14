'use strict';

expensesApp.factory('ConfigurationService', function ($http, $q) {

    var service = {
        addCategories: function (categories) {

            var dfr = $q.defer();
            $http.post('/config/addCategories', {categories: categories,IsDefaultCategories:false}).success(function (data, status, header, config) {
                dfr.resolve(data);

            }).error(function (data, status, header, config) {
                dfr.reject(data);
            });

            return dfr.promise;

        },
        addDefaultCategories: function () {

            var dfr = $q.defer();
            $http.post('/config/addCategories',{IsDefaultCategories:true}).success(function (data, status, header, config) {
                dfr.resolve(data);

            }).error(function (data, status, header, config) {
                dfr.reject(data);
            });

            return dfr.promise;

        },

        getCategories: function () {
            var dfr = $q.defer();
            $http.get('/config/getCategories').success(function (data, status, header, config) {
                dfr.resolve(data);

            }).error(function (data, status, header, config) {
                dfr.reject(data);
            });

            return dfr.promise;

        }

    };


    return service;
});