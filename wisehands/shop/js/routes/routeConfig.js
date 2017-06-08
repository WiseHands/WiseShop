(function () {
    angular.module('WiseShop', [
            'ngRoute', 'angularSpinners', 'google.places', 'pascalprecht.translate', 'tmh.dynamicLocale',
            'ngCookies', 'ngSanitize', 'angularSelectbox'
        ])
            .constant('LOCALES', {
                'locales': {
                    'uk_UA': 'Українська',
                    'en_US': 'English'
                },
                'preferredLocale': 'en_US'
            })
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
                when('/shoppingcart',{
                    templateUrl:'wisehands/shop/partials/shoppingcart.html',
                    controller:'ShoppingCartController'
                }).
                when('/orderprocessing',{
                    templateUrl:'wisehands/shop/partials/orderform.html',
                    controller:'OrderFormController'
                }).
                when('/paymentstage',{
                    templateUrl:'wisehands/shop/partials/paymentStage.html',
                    controller:'PaymentStageController'
                }).
                when('/newpost',{
                    templateUrl:'wisehands/shop/partials/newpost.html',
                    controller:'NewPostController'
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
        .config(
            ['$translateProvider', function ($translateProvider) {
                $translateProvider.useMissingTranslationHandlerLog();
                $translateProvider.useStaticFilesLoader({
                    prefix: 'wisehands/shop/resources/locale-',
                    suffix: '.json'
                });
                var html = document.getElementsByTagName('html')[0];
                var localization = html.lang;
                localStorage.setItem('locale', localization);
                $translateProvider.preferredLanguage(localization);
                $translateProvider.useSanitizeValueStrategy('escape');
                $translateProvider.use(localization);
            }])
        .config(
            ['tmhDynamicLocaleProvider', function (tmhDynamicLocaleProvider) {
                tmhDynamicLocaleProvider.localeLocationPattern('wisehands/assets/angular-i18n/angular-locale_{{locale}}.js');
            }])
})();
