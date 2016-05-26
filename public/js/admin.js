/**
 * Created by Reverie on 05/19/2016.
 */
(function () {
    angular.module('adminView', [
        'ngRoute',
        'orderList'
    ])
        .config(['$routeProvider',
            function ($routeProvider) {
                $routeProvider.
                    when('/',{
                        templateUrl:'public/admin/partials/orderList.html',
                        controller:'orderListController'
                }).
                when('/details/:uuid',{
                    templateUrl:'public/admin/partials/singleOrder.html',
                    controller:'SingleOrderCtrl'
                }).
                when('/products',{
                    templateUrl:'public/admin/partials/products.html',
                }).
                when('/products/new',{
                    templateUrl:'public/admin/partials/addNewProduct.html',
                    controller:'SubmitNewProductCtrl'
                }).
                    otherwise({
                    redirectTo:'/'
                });
            }]);
})();
