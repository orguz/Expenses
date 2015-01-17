/**
 * Created by orguz on 12/1/14.
 */
expensesApp.factory('UserDataService', function($window) {
    var Data = {
        isAuthenticated: false,


        get userId() {return $window.sessionStorage.userId},
        set userId(value) {$window.sessionStorage.userId = value},

        get token() {return $window.sessionStorage.token},
        set token(value) {$window.sessionStorage.token = value},


        get categories() {return $window.sessionStorage.categories},
        set categories(value) {$window.sessionStorage.categories = value}
    };


    return Data;
});