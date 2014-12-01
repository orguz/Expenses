/**
 * INSPINIA - Responsive Admin Theme
 * Copyright 2014 Webapplayers.com
 *
 */

var expensesApp = angular.module('expensesApp', [
    'ui.router',
    'ui.bootstrap',
    'angles',
]);



expensesApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise("/main/live");
    $httpProvider.interceptors.push('TokenInterceptor');
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            data: {pageTitle: 'Login page'},
            controller: 'LoginCtrl'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'views/register.html',
            data: {pageTitle: 'Registration page'},
            controller: 'RegisterCtrl'
        })
        .state('main.live', {
            url: '/live',
            templateUrl: 'views/live.html',
            data: { pageTitle: 'Live View' },
            access: { requiredAuthentication: true }
        })
        .state('main.trends', {
            url: '/trends',
            templateUrl: 'views/trends.html',
            data: { pageTitle: 'Trends View' },
            access: { requiredAuthentication: true }
        })
        .state('main', {
            abstract: true,
            url: "/main",
            templateUrl: "views/main.html",
            controller: 'WrapperCtrl'
        })
});


expensesApp.run(function ($rootScope, $state, $window, $location, UserDataService) {
    $rootScope.$on("$stateChangeStart",
        function (event, nextRoute) {
            //redirect only if both isAuthenticated is false and no token is set
            if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredAuthentication
                && !UserDataService.isAuthenticated && !$window.sessionStorage.token) {
                event.preventDefault();
                $state.go('login');
            }
        }
    );

});