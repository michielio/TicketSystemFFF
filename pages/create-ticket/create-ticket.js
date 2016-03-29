(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name trunkApp.controller:CreateTicketCtrl
     * @description
     * # TestCtrl
     * Controller of the trunkApp
     */
    window.app.controller('CreateTicketCtrl', ['$scope', 'FirebaseService','SharedDataService', function ($scope, FirebaseService, SharedDataService) {
        $scope.date = new Date();

        $scope.ticketNumber = 10 ;
        $scope.ticketTypes = SharedDataService.ticketTypes ;

        $scope.createTicket = function () {
            var newTicket = CreateNewTicketObject();
            console.log(newTicket);
           
            FirebaseService.createTicketinDb(newTicket) ;   
        }

        function CreateNewTicketObject() {
            var creationTime = new Date();
            creationTime = creationTime.toString();
            
            var recieveUpdates = assignRecieveUpdates() ;
            
            var unsolved = "unsolved";
            var na = "NA";
        
            var newTicket = {
                ticketnumber: $scope.ticketNumber,
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

            console.log(newTicket) ;
            
            return newTicket;
        }
        
        function assignRecieveUpdates(){
            var recieveUpdates = false ;
            
            if($scope.recieveUpdates !== undefined){
                recieveUpdates = true;
            } 
            
            return recieveUpdates ;
        }
	 }]);
})();