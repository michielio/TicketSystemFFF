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