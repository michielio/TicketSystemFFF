(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name trunkApp.controller:CreateTicketCtrl
     * @description
     * # TestCtrl
     * Controller of the trunkApp
     */
    window.app.controller('EditTicketCtrl', ['$scope', 'FirebaseService','SharedDataService', function ($scope, FirebaseService, SharedDataService) {

        $scope.ticketTypes = SharedDataService.ticketTypes ;
        $scope.priorityTypes = SharedDataService.priorityTypes ;
        $scope.statusTypes = SharedDataService.statusTypes ;
        
        $scope.SelectedTicket =  SharedDataService.GetSharedTicketData() ;

        $scope.editTicket = function () {
            var changedTicket = ChangeTicketObject();
            FirebaseService.updateTicketInDb(changedTicket);
        }
        
        function ChangeTicketObject() {
            console.log($scope.SelectedTicket.status) ;
            var changedTicket = $scope.SelectedTicket ;
            
            if($scope.SelectedTicket.ticketSolved){
                changedTicket.solvedDate = IssueSolvedDate() ;
            }
            
            console.log("after") ;
            console.log($scope.SelectedTicket) ;
            
/*            var newTicket = {
                ticketnumber: $scope.SelectedTicket.ticketNumber,
                subject: $scope.ticketName,
                created: $scope.created,
                type: $scope.selectedTicketType,
                email: $scope.emailConnectedToTicket,
                description: $scope.ticketDescription,
                status: $scope.ticketSatus,
                priority: $scope.ticketPriority,
                recieve_updates: $scope.revieveUpdates,
                solution: na,
                solvedDate: IssueSolvedDate() 
            }*/

            return changedTicket;
        }

        function IssueSolvedDate() {
            var solvedTime = new Date();
            console.log(solvedTime) ;
            solvedTime = solvedTime.toString();
            
            return solvedTime;
        }
        
        $scope.IsTicketSolved = function(){
            console.log("IsTicketSolved") ;
            if($scope.SelectedTicket.ticketSolved){
                ShowSolutionInput() ;
            } else{
                HideSolutionInput() ;
            }
        }
        
        function ShowSolutionInput(){
            document.getElementById("ticketSolutionObject").className = "form-group";
        }
        
        function HideSolutionInput(){
            document.getElementById("ticketSolutionObject").className = "hidden form-group";
        }

	 }]);
})();