(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name trunkApp.controller:CreateTicketCtrl
     * @description
     * # TestCtrl
     * Controller of the trunkApp
     */
    window.app.controller('CreateTicketCtrl', ['$scope', function ($scope) {
        $scope.message = 'hello world';
        $scope.date = new Date();
        
        $scope.ticketTypes = [{
                id: 1,
                name: "feature"
            },
            {
                id: 2,
                name: "bug"
            }, {
                id: 3,
                name: "unclear"
            }, {
                id:4,
                name:"other"
            }] ;
        
        $scope.createTicket = function(){
            var newTicket = CreateNewTicketObject() ;
            console.log(newTicket) ;
        } 
	 }]);
    
    function CreateNewTicketObject(){
        var creationTime = new Date() ;
        creationTime = creationTime.toString() ;
        var unsolved = "unsolved" ;
        var na = "NA" ;
        
        var newTicket = {
            ticketnr : $scope.ticketNumber,
            subject : $scope.ticketName,
            creationTime : creationTime,
            type : $scope.selectedTicketType,
            email :$scope.emailConnectedToTicket,
            description : $scope.ticketDescription,
            status : unsolved,
            priority : na,
            recieve_updates : $scope.revieveUpdates,
            solution : na,
            solvedDate : na
        }
        
        return newTicket ;
    }
    
    function AddNewTicketToDb(newTicket){
        
    }
})();