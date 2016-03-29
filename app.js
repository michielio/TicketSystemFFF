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
    $stateProvider

        .state('login', {
        url: '/',
        templateUrl: 'pages/login/login.html',
        controller: 'LoginCtrl',
        onEnter: function ($state) {
            console.log("Welcome to login");
        }
    })

    .state('create-ticket', {
        url: '/create-ticket',
        templateUrl: 'pages/create-ticket/create-ticket.html',
        controller: 'CreateTicketCtrl',
        onEnter: function ($state, FirebaseService) {
            if (FirebaseService.sessionExists() && !FirebaseService.isUserAdmin()) {
                console.log(FirebaseService.sessionExists());
                console.log(FirebaseService.isUserAdmin());
                console.log("Welcome to create-ticket");
            } else {
                $state.go('login');
            }
        }
    })

    .state('ticket-overview', {
        url: '/ticket-overview',
        templateUrl: 'pages/ticket-overview/ticket-overview.html',
        controller: 'TicketOverviewCtrl',
        onEnter: function ($state, FirebaseService) {
            if (FirebaseService.sessionExists() && FirebaseService.isUserAdmin()) {
                console.log("Welcome to ticket-overview");
            } else {
                $state.go('login');
            }
        }
    })

    .state('edit-ticket', {
        url: '/edit-ticket',
        templateUrl: 'pages/edit-ticket/edit-ticket.html',
        controller: 'EditTicketCtrl',
        onEnter: function ($state, FirebaseService, SharedDataService) {
            if (FirebaseService.sessionExists() && FirebaseService.isUserAdmin()) {
                if (SharedDataService.SharedTicketDataExists()) {
                    console.log("Welcome to edit ticket");
                } else {
                    $state.go("ticket-overview");
                }
            } else {
                $state.go('login');
            }
        }
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');
});