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


expensesApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/main/live");
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
            data: { pageTitle: 'Live View' }
        })
        .state('main.trends', {
            url: '/trends',
            templateUrl: 'views/trends.html',
            data: { pageTitle: 'Trends View' }
        })
        .state('main', {
            abstract: true,
            url: "/main",
            templateUrl: "views/main.html",
            controller: 'WrapperCtrl'

        })
}).run(function ($rootScope, $state,AuthenticationService) {
    $rootScope.$on("$stateChangeStart",
        function (event, toState, toParams, fromState, fromParams) {
            if (!AuthenticationService.isAuthenticated && !(toState.name == 'login' || toState.name == 'register') ) {
                event.preventDefault();
                $state.go('login');

            }
        }
    );
});