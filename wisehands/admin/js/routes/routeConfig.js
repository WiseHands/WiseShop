(function () {
    angular.module('WiseHands', [
        'ngRoute', 'angularSpinners'
    ])
        .config(['$routeProvider',
            function ($routeProvider) {
                var urlParam = function(name, w){
                    w = w || window;
                    var rx = new RegExp('[\&|\?]'+name+'=([^\&\#]+)'),
                        val = w.location.search.match(rx);
                    return !val ? '':val[1];
                };

                if(urlParam("X-AUTH-USER-ID") !== "") {
                    localStorage.setItem('X-AUTH-USER-ID', urlParam("X-AUTH-USER-ID")) ;
                    localStorage.setItem('X-AUTH-TOKEN',  urlParam("X-AUTH-TOKEN")) ;
                    history.pushState({}, '', 'admin' );
                }


                if(!localStorage.getItem('X-AUTH-TOKEN')){
                    window.location.hash = '';
                    window.location.pathname = '/login';
                }
                $routeProvider.
                    when('/',{
                        templateUrl:'wisehands/admin/partials/orderList.html',
                        controller:'OrderListController',
                        activetab: 'orderlist'
                    }).
                    when('/details/:uuid',{
                        templateUrl:'wisehands/admin/partials/singleOrder.html',
                        controller:'SingleOrderController',
                        activetab: 'orderlist'
                    }).
                    when('/products',{
                        templateUrl:'wisehands/admin/partials/products.html',
                        controller:'ProductListController',
                        activetab: 'productlist'
                    }).
                    when('/products/new',{
                        templateUrl:'wisehands/admin/partials/addNewProduct.html',
                        controller:'SubmitNewProductController',
                        activetab: 'productlist'
                    }).
                    when('/product/details/:uuid',{
                        templateUrl:'wisehands/admin/partials/productDetails.html',
                        controller:'ProductDetailsController',
                        activetab: 'productlist'
                    }).
                    when('/products/details/:uuid/edit',{
                        templateUrl:'wisehands/admin/partials/editProduct.html',
                        controller:'EditProductController',
                        activetab: 'productlist'
                    }).
                    when('/delivery',{
                        templateUrl:'wisehands/admin/partials/delivery.html',
                        controller:'DeliverySettingsController',
                        activetab: 'delivery'
                    }).
                    when('/delivery/newPost',{
                        templateUrl:'wisehands/admin/partials/newPostDelivery.html',
                        controller:'DeliverySettingsController',
                        activetab: 'delivery'
                    }).
                    when('/delivery/courier',{
                        templateUrl:'wisehands/admin/partials/courierDelivery.html',
                        controller:'DeliverySettingsController',
                        activetab: 'delivery'
                    }).
                    when('/delivery/selfTake',{
                        templateUrl:'wisehands/admin/partials/selfTakeDelivery.html',
                        controller:'DeliverySettingsController',
                        activetab: 'delivery'
                    }).
                    when('/settings',{
                        templateUrl:'wisehands/admin/partials/settings.html',
                        controller:'SettingsController',
                        activetab: 'settings'
                    }).
                    when('/contacts',{
                        templateUrl:'wisehands/admin/partials/contacts.html',
                        controller:'ContactsController',
                        activetab: 'contacts'
                    }).
                    when('/usersettings',{
                        templateUrl:'wisehands/admin/partials/usersSettings.html',
                        controller:'UsersSettingsController',
                        activetab: 'usersettings'
                    }).
                        otherwise({
                        redirectTo:'/'
                });
            }])
        .run(function ($http) {
            $http({
                method: 'GET',
                url: '/shop/details',
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                }
            })
                .then(function successCallback(response) {
                    document.title = response.data.shopName;

                }, function errorCallback(data) {
	                window.location.pathname = '/login';
                    console.log(data);
                });
        })
})();