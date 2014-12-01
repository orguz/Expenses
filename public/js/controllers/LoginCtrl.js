expensesApp.controller('LoginCtrl', ['$scope','$state', 'AuthenticationService', function ($scope,$state,AuthenticationService) {
    $scope.user = {};
    $scope.login = function () {
        AuthenticationService.login($scope.user).then(function(data) {
            $state.go('main.live');
        },
        function(data) {

        });
    }

}]);