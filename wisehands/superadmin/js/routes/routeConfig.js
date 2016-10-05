(function () {
    angular.module('SuperWiseHands', [
            'ngRoute'
        ])
        .config(['$routeProvider',
            function ($routeProvider) {

                $routeProvider.
                when('/',{
                    templateUrl:'wisehands/superadmin/partials/shopsSuperAdmin.html',
                    controller:'ShopListController',
                    activetab: 'shops'
                }).
                when('/sudo/shop/:uuid',{
                    templateUrl:'wisehands/superadmin/partials/shopDetailsSuperAdmin.html',
                    controller:'ShopDetailsController',
                    activetab: 'shops'
                }).
                otherwise({
                    redirectTo:'/'
                });
            }])
})();
