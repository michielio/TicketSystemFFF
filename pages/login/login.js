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
        $scope.loginClick = function (email, pass) {            
            FirebaseService.login({
                email: email,
                password: pass
            });            
        };  
        
	 }]);    
})();