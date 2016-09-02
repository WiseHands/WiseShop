(function () {
    angular.module('SuperWiseHands', [
            'ngRoute'
        ])
        .config(['$routeProvider',
            function ($routeProvider) {

                $routeProvider.
                when('/',{
                    templateUrl:'wisehands/superadmin/partials/superWiseHands.html',
                    controller:'SuperWiseHandsController'
                }).
                otherwise({
                    redirectTo:'/'
                });
            }])
})();
