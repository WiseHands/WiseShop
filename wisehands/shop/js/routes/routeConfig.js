(function () {
    angular.module('WiseShop', [
            'ngRoute', 'angularSpinners'
        ])
        .config(['$routeProvider', '$locationProvider',
            function ($routeProvider, $locationProvider) {

				$locationProvider.hashPrefix('!');

				if(getParameter('_escaped_fragment_')){
					location.hash = "#!" + getParameter('_escaped_fragment_');
				}

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
                    controller:'CategoryDetailsController'
                }).
                otherwise({
                    redirectTo:'/'
                });


                function getParameter(paramName) {
                  var searchString = window.location.search.substring(1),
                      i, val, params = searchString.split("&");

                  for (i=0;i<params.length;i++) {
                    val = params[i].split("=");
                    if (val[0] == paramName) {
                      return val[1];
                    }
                  }
                  return null;
                }
            }])
})();
