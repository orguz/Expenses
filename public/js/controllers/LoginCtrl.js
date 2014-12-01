expensesApp.controller('LoginCtrl', ['$scope', '$state','$window', 'AuthenticationService','UserDataService', function ($scope, $state, $window, AuthenticationService, UserDataService) {
    $scope.user = {};
    $scope.login = function () {
        if ($scope.user.username != null && $scope.user.password != null) {
            AuthenticationService.login($scope.user).then(function (data) {
                    UserDataService.isAuthenticated = true;
                    $window.sessionStorage.token = data.token;
                    $state.go('main.live');
                },
                function (data) {
                    console.log(data);
                });
        }
    }

}]);