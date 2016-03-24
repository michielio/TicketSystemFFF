(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name trunkApp.controller:LoginCtrl
     * @description
     * # TestCtrl
     * Controller of the trunkApp
     */
    window.app.controller('LoginCtrl', ['$scope','FirebaseService', function ($scope, FirebaseService) {
        $scope.message = 'hello world';

        var ref = new Firebase("https://scorching-fire-6609.firebaseio.com/");
        var globalAuthData;
        
        $loginButton.click(function () {
            var email = $emailInput.val();
            var password = $passInput.val();
            FirebaseService.login({
                email: email,
                password: password
            });
        });
	 }]);
})();