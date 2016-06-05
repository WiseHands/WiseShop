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
                        controller:'ProductListCtrl'
    
                    }).
                    when('/products/new',{
                        templateUrl:'public/admin/partials/addNewProduct.html',
                        controller:'SubmitNewProductCtrl'
                    }).
                    when('/product/details/:uuid',{
                        templateUrl:'public/admin/partials/productDetails.html',
                        controller:'ProductDetailsCtrl'
                    }).
                    when('/products/details/:uuid/edit',{
                        templateUrl:'public/admin/partials/editProduct.html',
                        controller:'ProductDetailsCtrl'
                    }).
                    when('/filter',{
                        templateUrl:'public/admin/partials/filterOrders.html',
                        controller:'FilterOptionsController'
                    }).
                        otherwise({
                        redirectTo:'/'
                });
            }])
        .service('shared',function(){
            var filterOptions = [];
            return{
                getFilterOptions: function(){
                    return filterOptions;
                },
                setFilterOptions: function(value){
                    filterOptions = value;
                }
            };
        })

})();
