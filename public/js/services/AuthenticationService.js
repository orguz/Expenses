'use strict';

expensesApp.factory('AuthenticationService', function ($http, $q) {

    var service = {
        login: function (user) {

            var dfr = $q.defer();
            $http.post('/serverauth/login', {user: user}).success(function (data, status, header, config) {
                dfr.resolve(data);

            }).error(function (data, status, header, config) {

                dfr.reject(data);
            });

            return dfr.promise;

        },
        register: function(user){
            var dfr = $q.defer();

            $http.post('/serverauth/register', {user: user}).success(function (data, status, header, config) {
                dfr.resolve(data);
            }).error(function (data, status, header, config) {
                dfr.reject(data);
            });

            return dfr.promise;
        }
    };


    return service;
});