expensesApp.controller('UserManagementCtrl', ['$scope', '$state', '$window','ConfigurationService', 'AuthenticationService', 'UserDataService', function ($scope, $state, $window, ConfigurationService, AuthenticationService, UserDataService) {
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
            AuthenticationService.register($scope.user).then(function () {
                    console.log('succesful registration');
                    ConfigurationService.addDefaultCategories().then(function (data){
                        UserDataService.categories = data.defaultCategories;
                        console.log(UserDataService.categories);
                        $state.go("main.live");
                    }, function (addCategoriesData){
                        console.log(addCategoriesData);
                    });

                },
                function (data) {
                    console.log(data);
                });
        }

    };

}]);