(function () {
    'use strict';
    
    window.app.service('FirebaseService', [function () {

        var FIREBASE_DATABASE_URL = "https://intense-fire-2806.firebaseio.com/";
        var ref = new Firebase(FIREBASE_DATABASE_URL);
        var administratorsRef = ref.child("administrators");

        var globalAuthData = undefined;

        this.login = function (email, password) {
            ref.authWithPassword({
                email: user.email,
                password: user.password
            }, function (error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    globalAuthData = authData;
                    console.log("Authenticated successfully with payload:", authData);
                }
            });
        }

        this.logout = function () {
            ref.unauth();
            globalAuthData = null;
        }

        this.isAdmin = function (uid) {
            administratorsRef.once('value', function (snapshot) {
                var databaseValue = snapshot.val();
                if (uid == databaseValue)
                    return true;
                else
                    return false;
            });
        }

        this.sessionExists = function () {
            var isValidSession = false;
            if (globalAuthData === undefined) {
                isValidSession = true;
            }
            return isValidSession;
        }

        this.getGlobalAuthData = function () {
            return globalAuthData;
        }

        this.setGlobalAuthData = function (newGlobalAuthData) {
            globalAuthData = newGlobalAuthData;
        }

        this.saveTicketinDb = function (ticket) {
            // insert code for persisting ticket to firebase database
            ref.push(ticket);
        }

        this.GetDataFromDb = function () {
            ref.on("value", function (snapshot) {
                var messagesFromDb = snapshot.val();


            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
        }

        
        this.tickets = [{
                'ticketnumber': '1',
                'subject': 'Test 1',
                'created': '11-03-2016',
                'type': 'feature',
                'email': 'joery@mail.com',
                'description': 'Test 1',
                'status': 'unsigned',
                'priority': 'low',
                'recieve_updates': true,
                'solution': 'Na',
                'solvedDate': 'Na'
                           },

            {
                'ticketnumber': '2',
                'subject': 'Test 2',
                'created': '12-02-2016',
                'type': 'feature',
                'email': 'wouter@mail.com',
                'description': 'Test 2',
                'status': 'unsigned',
                'priority': 'high',
                'recieve_updates': false,
                'solution': 'Na',
                'solvedDate': 'Na'
                           },

            {
                'ticketnumber': '3',
                'subject': 'HET DOET HET MAAR!',
                'created': '12-03-2016',
                'type': 'feature',
                'email': 'vincent@mail.com',
                'description': 'Test 3',
                'status': 'unsigned',
                'priority': 'average',
                'recieve_updates': false,
                'solution': 'Na',
                'solvedDate': 'Na'
                           }
                         ];
    }]);
})();