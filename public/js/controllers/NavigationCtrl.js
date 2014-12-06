expensesApp.controller('NavigationCtrl', ['$scope', '$state', '$window', 'AuthenticationService', 'UserDataService', function ($scope, $state, $window, AuthenticationService, UserDataService) {

    $scope.logout = function () {
        if (UserDataService.isAuthenticated) {

            AuthenticationService.logout().then(function (data) {
                UserDataService.isAuthenticated = false;
                delete $window.sessionStorage.token;
                $state.go('auth.login');
            }).error(function (data) {
                console.log(data);
            });
        }
        else {
            $state.go('auth.login');
        }
    };

}]);