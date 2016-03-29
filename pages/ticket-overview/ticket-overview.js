(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name trunkApp.controller:TicketOverviewCtrl
     * @description
     * # TestCtrl
     * Controller of the trunkApp
     */
    window.app.controller('TicketOverviewCtrl', ['$scope', '$state', 'FirebaseService', 'SharedDataService', function ($scope, $state, FirebaseService, SharedDataService) {

        $scope.ticketsLoaded = false;

        $scope.priority = '';
        $scope.creation = 'ticketnumber';
        $scope.type = '';


        $scope.tickets = [];

        FirebaseService.getTicketDataFromDb().then(function (tickets) {
            console.log(tickets);
            console.log(Object.keys(tickets)[1]);
            $scope.tickets = FirebaseService.convertToArray(tickets);
            $scope.ticketsLoaded = true;
        }, function (error) {
            console.log("Something went wrong");
        });

        $scope.editTicket = function (selectedTicket) {
            console.log(selectedTicket.ticketnumber);

            SharedDataService.SetSharedTicketData(selectedTicket);

            $state.go("edit-ticket");
        }

        $scope.setPriorityColour = function (priority) {
            var colour = "";
            if (priority == "high") {
                colour = "danger";
            } else if (priority == "average") {
                colour = "warning";
            } else {
                colour = "success";
            }
            return colour;
        }

        $scope.filterTickets = function (ticket) {
            var filterSearch = false;
            var filterType = false;
            var filterPriority = false;

            console.log("lol") ;
            
            if ($scope.tickets !== undefined) {
                if ($scope.search != undefined && $scope.search != "") {
                    if (ticket.subject.toLocaleLowerCase().indexOf($scope.search.toLowerCase()) > -1) {
                        filterSearch = true;
                    } else if (ticket.ticketnumber.toLocaleLowerCase().indexOf($scope.search.toLowerCase()) > -1) {
                        filterSearch = true;
                    }
                } else {
                    filterSearch = true;
                }

                if ($scope.type != "") {
                    if ($scope.type.toLowerCase().indexOf(ticket.type.toLowerCase()) > -1) {
                        filterType = true;
                    }
                } else {
                    filterType = true;
                }

                if ($scope.priority != "") {
                    if ($scope.priority.toLowerCase().indexOf(ticket.priority.toLowerCase()) > -1) {
                        filterPriority = true;
                    }
                } else {
                    filterPriority = true;
                }

                if (filterSearch && filterType && filterPriority) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
	 }]);
})();