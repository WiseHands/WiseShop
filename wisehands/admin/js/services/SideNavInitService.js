angular.module('WiseHands')
    .service('sideNavInit',function() {
        return {
            sideNav: function(){
                $(".button-collapse").sideNav();
                $('.collapsible').collapsible();
                $('div[id^=sidenav-overlay]').click();
            }
        }
    });