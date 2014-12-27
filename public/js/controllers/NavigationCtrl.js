expensesApp.controller('NavigationCtrl', ['$scope', '$state', '$window', 'AuthenticationService', 'UserDataService', function ($scope, $state, $window, AuthenticationService, UserDataService) {

    $scope.logout = function () {
        if (UserDataService.isAuthenticated) {

            AuthenticationService.logout().then(function () {
                UserDataService.isAuthenticated = false;
                delete $window.sessionStorage.token;
                $state.go('auth.login');
            }, function error(msg) {
                console.error(msg);
            });
        }
        else {
            $state.go('auth.login');
        }
    };

}]);