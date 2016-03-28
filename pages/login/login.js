(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name trunkApp.controller:LoginCtrl
     * @description
     * # TestCtrl
     * Controller of the trunkApp
     */
    window.app.controller('LoginCtrl', ['$scope', '$state', 'FirebaseService', function ($scope, $state, FirebaseService) {
        $scope.loginClick = function (email, pass) {
            if (email !== null && pass !== null) {
                FirebaseService.login({
                    email: email,
                    password: pass
                }).then(function (userType) {
                    // succesful response
                    if (userType === "admin") {
                        // user is admin proceed to ticket-overview page
                        $state.go("ticket-overview");
                    } else if (userType === "regular") {
                        // normal user proceed to create-ticket page
                        $state.go("create-ticket");
                    } else {
                        // something went wrong this is a unexpected userType
                    }
                }, function (error) {
                    // firebase coudn't find a match with username and password
                    console.log("No matching username and password!");
                });
            } else {
                // email and/or password are not filled in
            }
        };
    }]);
})();