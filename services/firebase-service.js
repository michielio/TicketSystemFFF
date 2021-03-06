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
        var tickets = undefined;

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

        firebaseService.createTicketinDb = function (ticket) {
            // insert code for persisting ticket to firebase database
            ticketsDataRef.push(ticket);
        }

        firebaseService.updateTicketInDb = function (changedTicket) {
            var ticketObjectKey = changedTicket["key"];
            var ticketToChangeRef = ticketsDataRef.child(ticketObjectKey);

            delete changedTicket["key"] ;
            
            ticketToChangeRef.update({
                'subject': changedTicket.subject,
                'created': changedTicket.created,
                'type': changedTicket.type,
                'email': changedTicket.email,
                'description': changedTicket.description,
                'status': changedTicket.status,
                'priority': changedTicket.priority,
                'receive_updates': changedTicket.receive_updates,
                'solution': changedTicket.solution,
                'solvedDate': changedTicket.solvedDate
            });
        }

        firebaseService.getTicketDataFromDb = function () {
            var defer = $q.defer();
            ticketsDataRef.on("value", function (snapshot) {
                firebaseService.setTickets(snapshot.val());
                defer.resolve(snapshot.val());
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code + "  " + globalAuthData.uid);
                defer.reject(errorObject);
            });
            return defer.promise;
        }

        firebaseService.convertToArray = function (objectData) {            
            var array = $.map(objectData, function (value, index) {
                console.log("Before : " + index) ;
                console.log(value) ;
                
                value["key"] = index ;
                console.log("After : " + index) ;
                console.log(value) ;
                
                return [value];
            });
            
            return array ;
        }

        firebaseService.getTickets = function () {
            return tickets;
        }

        firebaseService.setTickets = function (newTickets) {
            tickets = newTickets;
        }

    }]);
})();