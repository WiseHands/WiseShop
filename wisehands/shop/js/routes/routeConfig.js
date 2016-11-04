(function () {
    angular.module('WiseShop', [
            'ngRoute', 'angularSpinners'
        ])
        .config(['$routeProvider',
            function ($routeProvider) {

                $routeProvider.
                when('/',{
                    templateUrl:'wisehands/shop/partials/shopView.html',
                    controller:'ShopController',
                    activetab: 'main'
                }).
                when('/contacts',{
                    templateUrl:'wisehands/shop/partials/contacts.html',
                    controller:'ContactsController'
                }).
                when('/product/:uuid',{
                    templateUrl:'wisehands/shop/partials/productDetails.html',
                    controller:'ProductDetailsController'
                }).
                when('/category/:uuid',{
                    templateUrl:'wisehands/shop/partials/categoryDetails.html',
                    controller:'CategoryDetailsController',
                    activetab: 'uuid'
                }).
                otherwise({
                    redirectTo:'/'
                });
            }])
})();
