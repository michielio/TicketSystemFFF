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
            console.log("Welcome tod login");
        }
    })

    .state('create-ticket', {
        url: '/create-ticket',
        templateUrl: 'pages/create-ticket/create-ticket.html',
        controller: 'CreateTicketCtrl',
        onEnter: function ($state) {
            console.log("Welcome to create-ticket");
        }
    })

    .state('ticket-overview', {
        url: '/ticket-overview',
        templateUrl: 'pages/ticket-overview/ticket-overview.html',
        controller: 'TicketOverviewCtrl',
        onEnter: function ($state) {
            console.log("Welcome to ticket-overview");
        }
    })

    .state('edit-ticket', {
        url: '/edit-ticket',
        templateUrl: 'pages/edit-ticket/edit-ticket.html',
        controller: 'EditTicketCtrl',
        onEnter: function ($state) {
            console.log("Welcome to edit ticket");
        }
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');
});

window.app.factory('SharedDateService', function () {
        var savedData = {}

        function set(data) {
            savedData = data;
        }

        function get() {
            return savedData;
        }

        return {
            set: set,
            get: get
        }

    });