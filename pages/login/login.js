(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name trunkApp.controller:LoginCtrl
     * @description
     * # TestCtrl
     * Controller of the trunkApp
     */
    window.app.controller('LoginCtrl', ['$scope', function ($scope) {
        $scope.message = 'hello world';

        var ref = new Firebase("https://scorching-fire-6609.firebaseio.com/");
        var globalAuthData;
        
        $loginButton.click(function () {
            var email = $emailInput.val();
            var password = $passInput.val();
            login({
                email: email,
                password: password
            });
        });

        function login(user) {
            ref.authWithPassword({
                email: user.email,
                password: user.password
            }, function (error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    globalAuthData = authData;
                    console.log("Authenticated successfully with payload:", authData);
                }
            })
        };
	 }]);
})();