(function () {
    angular.module('WiseHands', [
        'ngRoute'
    ])
        .config(['$routeProvider',
            function ($routeProvider) {
                $routeProvider.
                    when('/',{
                        templateUrl:'public/admin/partials/orderList.html',
                        controller:'OrderListController'
                    }).
                    when('/details/:uuid',{
                        templateUrl:'public/admin/partials/singleOrder.html',
                        controller:'SingleOrderController'
                    }).
                    when('/products',{
                        templateUrl:'public/admin/partials/products.html',
                        controller:'ProductListController'

                    }).
                    when('/products/new',{
                        templateUrl:'public/admin/partials/addNewProduct.html',
                        controller:'SubmitNewProductController'
                    }).
                    when('/product/details/:uuid',{
                        templateUrl:'public/admin/partials/productDetails.html',
                        controller:'ProductDetailsController'
                    }).
                    when('/products/details/:uuid/edit',{
                        templateUrl:'public/admin/partials/editProduct.html',
                        controller:'ProductDetailsController'
                    }).
                    when('/filter',{
                        templateUrl:'public/admin/partials/filterOrders.html',
                        controller:'FilterOptionsController'
                    }).
                        otherwise({
                        redirectTo:'/'
                });
            }])
})();
