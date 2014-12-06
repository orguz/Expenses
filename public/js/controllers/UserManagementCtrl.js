expensesApp.controller('UserManagementCtrl', ['$scope', '$state', '$window', 'AuthenticationService', 'UserDataService', function ($scope, $state, $window, AuthenticationService, UserDataService) {
    $scope.user = {};
    $scope.login = function () {
        if ($scope.user.username != null && $scope.user.password != null) {
            AuthenticationService.login($scope.user).then(function (data) {
                    $state.go('main.live');
                },
                function (data) {
                    console.log(data);
                });
        }
    };

    $scope.register = function () {
        console.log('entered register function in UserManagementCtrl');
        console.log($scope.user.username);

        if (UserDataService.isAuthenticated) {
            $state.go("main.live");
        }
        else {
            AuthenticationService.register($scope.user).then(function (data) {
                    console.log('succesful registration');

                    $state.go("main.live");
                },
                function (data) {
                    console.log(data);
                });
        }

    };

}]);