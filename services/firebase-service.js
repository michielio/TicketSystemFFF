(function () {
    'use strict';
    window.app.service('FirebaseService', [function () {

        var FIREBASE_DATABASE_URL = "https://intense-fire-2806.firebaseio.com/";
        var ref = new Firebase(FIREBASE_DATABASE_URL);
        var administratorsRef = ref.child("administrator");

        var globalAuthData = undefined;

        this.login = function (user) {
            ref.authWithPassword({
                email: user.email,
                password: user.password
            }, function (error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    globalAuthData = authData;
                    console.log("Authenticated successfully with payload:", authData);
                    if (this.isAdmin(authData)) {
                        $scope.$state.go('ticket-overview');
                    } else {
                        $scope.$state.go('create-ticket');
                    }
                }
            });
        }

        this.logout = function () {
            ref.unauth();
            globalAuthData = null;
        }

        this.isAdmin = function (auth) {
            console.log("In isAdmin");
            administratorsRef.on("value", function (snapshot) {
                console.log(snapshot.val());
                var databaseValue = snapshot.val();
                if (auth.uid == databaseValue)
                    return true;
                else
                    return false;
            }, function (error) {
                console.log("The read failed: " + error);
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

        this.saveTicket = function (ticket) {
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
    }]);
})();