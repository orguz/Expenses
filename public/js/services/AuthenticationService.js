'use strict';

expensesApp.factory('AuthenticationService', function ($http, $q, $window, UserDataService, ConfigurationService) {

    var service = {
        login: function (user) {

            var dfr = $q.defer();
            $http.post('/serverauth/login', {user: user}).success(function (data, status, header, config) {
                UserDataService.userId = data.userId;
                UserDataService.isAuthenticated = true;
                $window.sessionStorage.token = data.token;
                dfr.resolve(data);

            }).error(function (data, status, header, config) {

                dfr.reject(data);
            });

            return dfr.promise;

        },
        register: function(user){
            var dfr = $q.defer();

            $http.post('/serverauth/register', {user: user}).success(function (data, status, header, config) {
                UserDataService.isAuthenticated = true;
                $window.sessionStorage.token = data.token;

                //UserId is persisted on sessionStorage for supporting page refresh
                $window.sessionStorage.userId = data.userId;
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