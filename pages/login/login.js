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
            FirebaseService.login({
                email: email,
                password: pass
            }).then(function (resp) {
                // succesful response
                if ($scope.checkUserType()) {
                    // user is admin proceed to ticket-overview page
                    $state.go("ticket-overview");
                } else {
                    // normal user proceed to create-ticket page
                    $state.go("create-ticket");
                }
            }, function (error) {
                // firebase coudn't find a match with username and password
            });
        };
        
        $scope.checkUserType = function(){
            FirebaseService.isUserAdmin().then(function(resp){
                return resp;
            },function(error){
                return error;
            })
        }

	 }]);
})();