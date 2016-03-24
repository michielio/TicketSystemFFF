'use strict';

window.base_dir = '';
/**
 * @ngdoc overview
 * @name trunkApp
 * @description
 * # trunkApp
 *
 * Main module of the application.
 */
window.app = angular.module('trunkApp', [
	'ngAnimate',
	'ngRoute'
])
.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: window.base_dir + 'pages/test/test.html',
			controller: 'TestCtrl',
			controllerAs: 'ctrl'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);