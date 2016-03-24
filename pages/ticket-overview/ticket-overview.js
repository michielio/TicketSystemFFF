(function() {
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
        $scope.creation = 'Newest';
        $scope.type = '';
        
        
        $scope.tickets = [{'ticketnumber':'1', 
                           'subject':'HET DOET HET NIET!', 
                           'created': '12-03-2015',
                           'type': 'bug',
                           'status': 'unsigned',
                           'priority': 'high',
                           },
                          
                         {'ticketnumber':'2', 
                           'subject':'HET DOET HET WEL!', 
                           'created': '12-03-2012',
                           'type': 'bug',
                           'status': 'unsigned',
                           'priority': 'high',
                           },
                         
                         {'ticketnumber':'3', 
                           'subject':'HET DOET HET MAAR!', 
                           'created': '12-03-2011',
                           'type': 'feature',
                           'status': 'unsigned',
                           'priority': 'average',
                           }
                         
                         
                         
                         ];
        
        $scope.editTicket = function(ticketnumber) {
            console.log(ticketnumber);
        }
        
        
	 }]);
})();