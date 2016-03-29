(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name trunkApp.controller:CreateTicketCtrl
     * @description
     * # TestCtrl
     * Controller of the trunkApp
     */
    window.app.controller('CreateTicketCtrl', ['$scope', 'FirebaseService', 'SharedDataService', function ($scope, FirebaseService, SharedDataService) {
        $scope.date = new Date();

        $scope.ticketTypes = SharedDataService.ticketTypes;

        $scope.createTicket = function () {
            var newTicket = CreateNewTicketObject();
            FirebaseService.createTicketinDb(newTicket);
        }

        function CreateNewTicketObject() {
            var currentDate = new Date();
            var creationMinutes = assignCreationMinutes(currentDate);
            var creationTime = currentDate.getDate() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getFullYear() + " " + currentDate.getUTCHours() + ":" + creationMinutes;

            var recieveUpdates = assignRecieveUpdates();

            var unsolved = "unsolved";
            var na = "NA";

            var newTicket = {
                subject: $scope.ticketName,
                created: creationTime,
                type: $scope.selectedTicketType,
                email: $scope.email,
                description: $scope.ticketDescription,
                status: unsolved,
                priority: na,
                recieve_updates: recieveUpdates,
                solution: na,
                solvedDate: na
            }
            return newTicket;
        }

        function assignRecieveUpdates() {
            var recieveUpdates = false;

            if ($scope.recieveUpdates !== undefined) {
                recieveUpdates = true;
            }
            return recieveUpdates;
        }

        function assignCreationMinutes(currentDate) {
            var creationMinutes = currentDate.getUTCMinutes();
            if (creationMinutes < 10) {
                creationMinutes = "0" + creationMinutes;
            }
            return creationMinutes;
        }
	 }]);
})();