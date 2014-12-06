/**
 * Created by orguz on 12/1/14.
 */
expensesApp.factory('UserDataService', function() {
    var auth = {
        isAuthenticated: false,
        userId: ''
    }

    return auth;
});