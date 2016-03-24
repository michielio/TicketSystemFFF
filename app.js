'use strict';

/**
 * @ngdoc overview
 * @name myApp
 * @description
 * # myApp
 *
 * Main module of the application.
 */
window.app = angular.module('myApp', ['ui.router'])



.config(function ($stateProvider, $urlRouterProvider) {
console.log("hallo!");
    $stateProvider

        .state('login', {
        url: '/',
        templateUrl: 'pages/login/login.html',
        controller: 'LoginCtrl',
        onEnter: function ($state) {
            console.log("Welcome on login");
        }
    })

    .state('create-ticket', {
        url: '/create-ticket',
        templateUrl: 'pages/create-ticket/create-ticket.html',
        controller: 'CreateTicketCtrl',
        onEnter: function ($state) {
            console.log("Welcome on create-ticket");
        }
    })
    
    .state('ticket-overview', {
        url: '/ticket-overview',
        templateUrl: 'pages/ticket-overview/ticket-overview.html',
        controller: 'TicketOverviewCtrl',
        onEnter: function ($state) {
            console.log("Welcome on ticket-overview");
        }
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');
});