(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name trunkApp.controller:CreateTicketCtrl
     * @description
     * # TestCtrl
     * Controller of the trunkApp
     */
    window.app.controller('CreateTicketCtrl', ['$scope', 'FirebaseService', function ($scope, FirebaseService) {
        $scope.message = 'hello world';
        $scope.date = new Date();

        $scope.ticketTypes = SharedDataService.ticketTypes ;

        $scope.createTicket = function () {
            var newTicket = CreateNewTicketObject();
            console.log(newTicket);
            AddNewTicketToDb(newTicket) ;
        }

        function CreateNewTicketObject() {
            var creationTime = new Date();
            creationTime = creationTime.toString();
            var unsolved = "unsolved";
            var na = "NA";

            var newTicket = {
                ticketnumber: $scope.ticketNumber,
                subject: $scope.ticketName,
                created: creationTime,
                type: $scope.selectedTicketType,
                email: $scope.emailConnectedToTicket,
                description: $scope.ticketDescription,
                status: unsolved,
                priority: na,
                recieve_updates: $scope.revieveUpdates,
                solution: na,
                solvedDate: na
            }

            return newTicket;
        }

        function AddNewTicketToDb(newTicket) {
            FirebaseService.saveTicketinDb(newTicket) ;
        }

	 }]);
})();