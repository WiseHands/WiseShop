angular.module('WiseHands')
    .service('signout',function() {
        return {
            signOut: function(){
                localStorage.clear();
                window.location = '/';
            }

        }
    });