'use strict';

expensesApp.factory('AuthenticationService', function ($http, $q, $window, UserDataService, ConfigurationService) {

    var service = {
        login: function (user) {

            var dfr = $q.defer();
            $http.post('http://localhost:3000/serverauth/login', {user: user}).success(function (data) {
                UserDataService.userId = data.userId;
                UserDataService.isAuthenticated = true;
                UserDataService.token = data.token;
                console.log(data);
                dfr.resolve(data);

            }).error(function (data, status, header, config) {
                console.log(data);
                console.log(status);
                console.log(config);
                dfr.reject(data);
            });

            return dfr.promise;

        },
        register: function(user){
            var dfr = $q.defer();

            $http.post('/serverauth/register', {user: user}).success(function (data, status, header, config) {
                UserDataService.isAuthenticated = true;
                UserDataService.token = data.token;
                UserDataService.userId = data.userId;

                dfr.resolve(data);
            }).error(function (data, status, header, config) {
                dfr.reject(data);
            });

            return dfr.promise;
        },
        logout: function(){
            var dfr = $q.defer();
            $http.post('/serverauth/logout').success(function () {
                dfr.resolve();
            }).error(function () {
                dfr.reject();
            });

            return dfr.promise;
        }
    };


    return service;
});