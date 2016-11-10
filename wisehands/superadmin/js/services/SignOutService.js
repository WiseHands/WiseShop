angular.module('SuperWiseHands')
    .service('signout', [function() {
        return {
            signOut: function(){
                localStorage.clear();
                window.location = '/';
            }

        }
    }]);