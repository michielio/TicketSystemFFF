(function () {
    'use strict';
    window.app.service('FirebaseService', ['$q', function ($q) {
        var FirebaseService = this;
        var FIREBASE_DATABASE_URL = "https://intense-fire-2806.firebaseio.com/";
        var ref = new Firebase(FIREBASE_DATABASE_URL);
        var administratorsRef = ref.child("administrator");

        var globalAuthData = undefined;
        var userType = undefined;

        FirebaseService.login = function (user) {
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
                    FirebaseService.retrieveUserType(defer);
                }
            });
            return defer.promise;
        }

        FirebaseService.retrieveUserType = function (defer) {
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

        FirebaseService.logout = function () {
            ref.unauth();
            globalAuthData = null;
        }

        FirebaseService.sessionExists = function () {
            var isValidSession = false;
            if (globalAuthData === undefined) {
                isValidSession = true;
            }
            return isValidSession;
        }

        FirebaseService.getGlobalAuthData = function () {
            return globalAuthData;
        }

        FirebaseService.setGlobalAuthData = function (newGlobalAuthData) {
            globalAuthData = newGlobalAuthData;
        }

        FirebaseService.saveTicket = function (ticket) {
            // insert code for persisting ticket to firebase database
            ref.push(ticket);
        }

        FirebaseService.GetDataFromDb = function () {
            ref.on("value", function (snapshot) {
                var messagesFromDb = snapshot.val();


            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
        }
    }]);
})();