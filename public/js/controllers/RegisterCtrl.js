expensesApp.controller('RegisterCtrl', ['$scope', '$state','$location', 'AuthenticationService', function ($scope, $state, $location, AuthenticationService) {
    $scope.user = {};
    $scope.register = function () {
        console.log('entered register function in RegisterCtrl');
        console.log($scope.user.username);

        if (AuthenticationService.isAuthenticated) {
            $location.path("/main.live");
        }
        else {
            AuthenticationService.register($scope.user).then(function (data) {
                    console.log('succesful registration');
                    $location.path("/login");
                },
                function (data) {
                    console.log(data);
                });
        }

    }

}]);