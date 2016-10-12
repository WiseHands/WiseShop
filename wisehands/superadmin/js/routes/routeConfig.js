(function () {
    angular.module('SuperWiseHands', [
            'ngRoute'
        ])
        .config(['$routeProvider',
            function ($routeProvider) {

                $routeProvider.
                when('/',{
                    templateUrl:'wisehands/superadmin/partials/shops.html',
                    controller:'ShopListController',
                    activetab: 'shops'
                }).
                when('/sudo/shop/:uuid',{
                    templateUrl:'wisehands/superadmin/partials/shopDetails.html',
                    controller:'ShopDetailsController',
                    activetab: 'shops'
                }).
                when('/users',{
                    templateUrl:'wisehands/superadmin/partials/users.html',
                    controller:'UsersController',
                    activetab: 'users'
                }).
                when('/sudo/user/:uuid',{
                    templateUrl:'wisehands/superadmin/partials/userDetails.html',
                    controller:'UserDetailsController',
                    activetab: 'users'
                }).
                when('/orders',{
                    templateUrl:'wisehands/superadmin/partials/orders.html',
                    controller:'OrdersController',
                    activetab: 'orders'
                }).
                when('/sudo/order/:uuid',{
                    templateUrl:'wisehands/superadmin/partials/orderDetails.html',
                    controller:'OrderDetailsController',
                    activetab: 'orders'
                }).
                otherwise({
                    redirectTo:'/'
                });
            }])
})();
