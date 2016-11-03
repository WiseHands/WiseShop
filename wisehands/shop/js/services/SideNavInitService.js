angular.module('WiseShop')
    .service('sideNavInit', [ function() {
        return {
            sideNav: function(){
                $('.button-collapse').sideNav();
                $('.collapsible').collapsible();
                var el = document.querySelector('.custom-scrollbar');
                Ps.initialize(el);
                $('div[id^=sidenav-overlay]').click();
            }
        }
    }]);