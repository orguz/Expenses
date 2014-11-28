'use strict';

expensesApp.factory('AuthenticationService', function ($http, $q) {
    var nodeServer = 'http://localhost:5000';
    var loginPath = '/serverauth/login';
    var isLoggedIn = false;

    var service = {
        login: function (user) {

            var dfr = $q.defer();
            $http.post(nodeServer + loginPath, {user: user}).success(function (data, status, header, config) {
                isLoggedIn = true;
                dfr.resolve(data);

            }).error(function (data, status, header, config) {

                dfr.reject(data);
            });

            return dfr.promise;


        },
        isAuthenticated: function(){
            return isLoggedIn;
        }
    };


    return service;
})