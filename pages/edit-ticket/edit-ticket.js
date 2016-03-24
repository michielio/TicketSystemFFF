(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name trunkApp.controller:CreateTicketCtrl
     * @description
     * # TestCtrl
     * Controller of the trunkApp
     */
    window.app.controller('EditTicketCtrl', ['$scope', 'FirebaseService', function ($scope, FirebaseService) {
        ref.on("value", function(snapshot) {
            var messagesFromDb = snapshot.val();
            var messagesKeysFromDb = Object.keys(messagesFromDb);
            var amountOfMessages = Object.keys(messagesFromDb).length;

            addLastTenMessagesFromSnapshotToHtmlPage(messagesFromDb, messagesKeysFromDb, amountOfMessages);

        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
	 }]);
})();