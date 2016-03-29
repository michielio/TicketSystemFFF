(function () {
    'use strict';

    window.app.service('FirebaseService', ['$q', function ($q) {
        var firebaseService = this;
        var FIREBASE_DATABASE_URL = "https://intense-fire-2806.firebaseio.com/";
        var ref = new Firebase(FIREBASE_DATABASE_URL);
        var administratorsRef = ref.child("administrator");
        var ticketsDataRef = ref.child("tickets");

        var globalAuthData = undefined;
        var userType = undefined;

        firebaseService.login = function (user) {
            // with '$q' we can make a piece of synchronous code
            var defer = $q.defer();
            ref.authWithPassword({
                email: user.email,
                password: user.password
            }, function (error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                    defer.reject(false);
                } else {
                    globalAuthData = authData;
                    console.log("Authenticated successfully with payload:", authData);
                    // we pass on the defer to the method which will determine the userType
                    firebaseService.retrieveUserType(defer);
                }
            });
            return defer.promise;
        }

        firebaseService.retrieveUserType = function (defer) {
            administratorsRef.on("value", function (snapshot) {
                var databaseValue = snapshot.val();
                if (globalAuthData.uid === databaseValue) {
                    userType = "admin";
                    defer.resolve(userType);
                } else {
                    userType = "regular";
                    defer.resolve(userType);
                }
            }, function (error) {
                console.log("The read failed: " + error);
                defer.reject(userType);
            });
        }

        firebaseService.logout = function () {
            ref.unauth();
            globalAuthData = null;
        }

        firebaseService.sessionExists = function () {
            var sessionExists = false;
            if (globalAuthData !== undefined) {
                sessionExists = true;
            }
            return sessionExists;
        }

        firebaseService.isUserAdmin = function () {
            var isUserAdmin = false;

            if (userType === 'admin') {
                isUserAdmin = true;
            }
            return isUserAdmin;
        }

        firebaseService.getGlobalAuthData = function () {
            return globalAuthData;
        }

        firebaseService.setGlobalAuthData = function (newGlobalAuthData) {
            globalAuthData = newGlobalAuthData;
        }

        firebaseService.saveTicketinDb = function (ticket) {
            // insert code for persisting ticket to firebase database
            ref.push(ticket);
        }

        firebaseService.updateTicketInDb = function (changedTicket) {
            var savedTicketsRef = ref.chilld("tickets");
            var ticketToChangeRef = savedTicketsRef.child("ticketid"); // Ik weet nog niet hoe Firebase deze tickets gaat noemen!

            ticketToChangeRef.update({
                'ticketnumber': changedTicket.ticketnumber,
                'subject': changedTicket.subject,
                'created': changedTicket.created,
                'type': changedTicket.type,
                'email': changedTicket.email,
                'description': changedTicket.description,
                'status': changedTicket.status,
                'priority': changedTicket.priority,
                'recieve_updates': changedTicket.recieve_updates,
                'solution': changedTicket.solution,
                'solvedDate': changedTicket.solvedDate
            });

            /*          Voor de test app

                        var ammountOfTickets = FirebaseService.tickets.length ;
                        for(var i = 0; i < ammountOfTickets; i++){
                            var ticket = FirebaseService.tickets[i] ;
                            
                            if(ticket.ticketnumber === changedTicket.ticketnumber){
                                FirebaseService.tickets[i] = changedTicket ;
                            }
                        }*/
        }

        firebaseService.getTicketDataFromDb = function () {
            ticketsDataRef.on("value", function (snapshot) {
                console.log(snapshot.val());
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code + "  " + globalAuthData.uid);
            });


            /*            ticketDataRef.on("value", function (snapshot) {
                            console.log(snapshot.val());
                        }, function (errorObject) {
                            console.log("The read failed: " + errorObject.code);
                        });*/
        }


        firebaseService.tickets = [{
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