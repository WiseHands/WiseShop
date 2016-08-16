(function () {
    angular.module('WiseShop', [
            'ngRoute'
        ])
        .config(['$routeProvider',
            function ($routeProvider) {

                $routeProvider.
                when('/',{
                    templateUrl:'public/shop/partials/shopView.html',
                    controller:'ShopController'
                }).
                otherwise({
                    redirectTo:'/'
                });
            }])
})();
