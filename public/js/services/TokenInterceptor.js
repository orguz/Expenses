/**
 * Created by orguz on 12/1/14.
 */
expensesApp.factory('TokenInterceptor', function ($q, $window, $location, UserDataService) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.authorization = $window.sessionStorage.token;
                config.headers.userid= UserDataService.userId;
            }
            return config;
        },

        requestError: function(rejection) {
            return $q.reject(rejection);
        },

        /* Set Authentication.isAuthenticated to true if 200 received & support refresh*/
        response: function (response) {
            if (response != null && response.status == 200 && $window.sessionStorage.token && !UserDataService.isAuthenticated) {
                UserDataService.isAuthenticated = true;
                UserDataService.userId = $window.sessionStorage.userId;
            }
            return response || $q.when(response);
        },

        /* Revoke client authentication if 401 is received */
        responseError: function(rejection) {
            if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || UserDataService.isAuthenticated)) {
                delete $window.sessionStorage.token;
                UserDataService.isAuthenticated = false;
                $location.path("auth/login");
            }

            return $q.reject(rejection);
        }
    };
});