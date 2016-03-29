(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name trunkApp.controller:CreateTicketCtrl
     * @description
     * # TestCtrl
     * Controller of the trunkApp
     */
    window.app.controller('CreateTicketCtrl', ['$scope', '$state', 'FirebaseService', 'SharedDataService', function ($scope, $state, FirebaseService, SharedDataService) {
        $scope.date = new Date();

        $scope.ticketTypes = SharedDataService.ticketTypes;

        $scope.createTicket = function () {
            var newTicket = CreateNewTicketObject();
            FirebaseService.createTicketinDb(newTicket);
            alert("Bedankt voor uw ticket!");
            $state.go('login');
        }

        function CreateNewTicketObject() {
            var currentDate = new Date();
            var creationMinutes = assignCreationMinutes(currentDate);
            var creationTime = currentDate.getDate() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getFullYear() + " " + currentDate.getUTCHours() + ":" + creationMinutes;

            var receiveUpdates = assignReceiveUpdates();

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
                receive_updates: receiveUpdates,
                solution: na,
                solvedDate: na
            }
            return newTicket;
        }

        function assignReceiveUpdates() {
            var receiveUpdates = false;

            if ($scope.receiveUpdates !== undefined) {
                receiveUpdates = true;
            }
            return receiveUpdates;
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