(function () {
    angular.module('WiseHands', [
        'ngRoute'
    ])
        .config(['$routeProvider',
            function ($routeProvider) {
                if(!localStorage.getItem('X-AUTH-TOKEN')){
                    window.location.hash = '';
                    window.location.pathname = '/login';
                }
                $routeProvider.
                    when('/',{
                        templateUrl:'public/admin/partials/orderList.html',
                        controller:'OrderListController',
                        activetab: 'orderlist'
                    }).
                    when('/details/:uuid',{
                        templateUrl:'public/admin/partials/singleOrder.html',
                        controller:'SingleOrderController',
                        activetab: 'orderlist'
                    }).
                    when('/products',{
                        templateUrl:'public/admin/partials/products.html',
                        controller:'ProductListController',
                        activetab: 'productlist'
                    }).
                    when('/products/new',{
                        templateUrl:'public/admin/partials/addNewProduct.html',
                        controller:'SubmitNewProductController',
                        activetab: 'productlist'
                    }).
                    when('/product/details/:uuid',{
                        templateUrl:'public/admin/partials/productDetails.html',
                        controller:'ProductDetailsController',
                        activetab: 'productlist'
                    }).
                    when('/products/details/:uuid/edit',{
                        templateUrl:'public/admin/partials/editProduct.html',
                        controller:'ProductDetailsController',
                        activetab: 'productlist'
                    }).
                    when('/filter',{
                        templateUrl:'public/admin/partials/filterOrders.html',
                        controller:'FilterOptionsController',
                        activetab: 'orderlist'
                    }).
                        otherwise({
                        redirectTo:'/'
                });
            }])
})();
