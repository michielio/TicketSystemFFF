(function () {
    'use strict';
    window.app.service('FirebaseService', [function () {

        var FIREBASE_DATABASE_URL = "https://glowing-inferno-1129.firebaseio.com/";
        var ref = new Firebase(FIREBASE_DATABASE_URL);
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

        this.sessionExists = function () {
            var isValidSession = false;
            if (globalAuthData === undefined) {
                isValidSession = true;
            }
            return isValidSession;
        }

        this.getGlobalAuthData() {
            return globalAuthData;
        }

        this.setGlobalAuthData(newGlobalAuthData) {
            globalAuthData = newGlobalAuthData;
        }
        
        this.saveTicket = function (ticket){
        // insert code for persisting ticket to firebase database
        }

    }]);
})();