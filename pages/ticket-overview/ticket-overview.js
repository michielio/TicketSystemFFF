(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name trunkApp.controller:TicketOverviewCtrl
     * @description
     * # TestCtrl
     * Controller of the trunkApp
     */
    window.app.controller('TicketOverviewCtrl', ['$scope', function ($scope) {

        $scope.priority = '';
        $scope.creation = 'ticketnumber';
        $scope.type = '';


        $scope.tickets = [{
                'ticketnumber': '1',
                'subject': 'HET DOET HET NIET!',
                'created': '12-03-2015',
                'type': 'bug',
                'status': 'unsigned',
                'priority': 'high',
                           },

            {
                'ticketnumber': '2',
                'subject': 'HET DOET HET WEL!',
                'created': '12-03-2012',
                'type': 'bug',
                'status': 'unsigned',
                'priority': 'high',
                           },

            {
                'ticketnumber': '3',
                'subject': 'HET DOET HET MAAR!',
                'created': '12-03-2011',
                'type': 'feature',
                'status': 'unsigned',
                'priority': 'average',
                           }



                         ];

        $scope.editTicket = function (ticketnumber) {
            console.log(ticketnumber);
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
        }
	 }]);
})();