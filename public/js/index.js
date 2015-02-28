/**
 * INSPINIA - Responsive Admin Theme
 * Copyright 2014 Webapplayers.com
 *
 */

var expensesApp = angular.module('expensesApp', [
    'ui.router',
    'ui.bootstrap',
    'underscore',
    'datatables',
    'datatables.tabletools'
]);



expensesApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    //$urlRouterProvider.otherwise("/main/trends");
    $urlRouterProvider.otherwise( function($injector) {
        var $state = $injector.get("$state");
        $state.go("main.live");
    });
    //$urlRouterProvider.otherwise(function($location){
    //    console.log($location)
    //});
    $httpProvider.interceptors.push('TokenInterceptor');
    $stateProvider
        .state('auth', {
            abstract: true,
            url: "/auth",
            templateUrl: "views/auth.html",
            controller: 'UserManagementCtrl',
            access: { requiredAuthentication: false }

        })
        .state('auth.login', {
            url: '/login',
            templateUrl: 'views/login.html',
            data: {pageTitle: 'Login page'}
        })
        .state('auth.register', {
            url: '/register',
            templateUrl: 'views/register.html',
            data: {pageTitle: 'Registration page'}
        })
        .state('main', {
            abstract: true,
            url: "/main",
            templateUrl: "views/main.html",
            controller: 'WrapperCtrl'
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


});


expensesApp.run(function ($rootScope, $state, $window, $location, UserDataService) {
    $rootScope.$on("$stateChangeStart",
        function (event, nextRoute) {
            //redirect only if both isAuthenticated is false and no token is set
            if (nextRoute != null && nextRoute.url != '/login' && nextRoute.access != null && nextRoute.access.requiredAuthentication
                && !UserDataService.isAuthenticated && !UserDataService.token) {
                event.preventDefault();
                $state.go('auth.login');
            }
        }
    );

});