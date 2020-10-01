(function () {
    angular.module('WiseHands', [
        'ngRoute', 'angularSpinners', 'colorpicker.module', 'chart.js', 'pascalprecht.translate', 'tmh.dynamicLocale',
        'ngCookies', 'ngSanitize', 'ngTagsInput', 'imageCropper', 'ui.bootstrap'
    ])
        .constant('LOCALES', {
            'locales': {
                'uk_UA': 'Українська',
                'en_US': 'English',
                'pl_PL': 'Polski'
            },
            'preferredLocale': 'en_US'
        })

        .config(
            ['$routeProvider',
            function ($routeProvider) {
                var urlParam = function(name, w){
                    w = w || window;
                    var rx = new RegExp('[\&|\?]'+name+'=([^\&\#]+)'),
                        val = w.location.search.match(rx);
                    return !val ? '':val[1];
                };

                if (urlParam("JWT_TOKEN") !== "") {
                    localStorage.setItem('JWT_TOKEN', urlParam("JWT_TOKEN")) ;
                    history.pushState({}, '', 'admin' );
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
                    when('/pageconstructor',{
                        templateUrl:'wisehands/admin/partials/pageconstructor.html',
                        controller:'PageConstructorController',
                        activetab: 'pageconstructors'
                    }).
                    when('/pageconstructor/new',{
                        templateUrl:'wisehands/admin/partials/addNewPage.html',
                        controller:'AddNewPageController',
                        activetab: 'newpage'
                    }).
                    when('/pageconstructor/edit/:uuid',{
                        templateUrl:'wisehands/admin/partials/editPage.html',
                        controller:'EditPageController',
                        activetab: 'newpage'
                    }).
                    when('/translation/pageconstructor/:objectUuid/:translationUuid',{
                        templateUrl:'wisehands/admin/partials/editPageTranslation.html',
                        controller:'EditPageTranslationController',
                        activetab: 'newpage'
                    }).
                    when('/products',{
                        templateUrl:'wisehands/admin/partials/products.html',
                        controller:'ProductListController',
                        activetab: 'productlist'
                    }).
                    when('/feedback',{
                        templateUrl:'wisehands/admin/partials/feedbackList.html',
                        controller:'FeedbackListController',
                        activetab: 'feedback'
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
                    when('/network',{
                        templateUrl:'wisehands/admin/partials/network.html',
                        controller:'NetworkController',
                        activetab: 'contacts'
                    }).
                    when('/network/new',{
                        templateUrl:'wisehands/admin/partials/createNetworkShops.html',
                        controller:'CreateNetworkShopsController',
                        activetab: 'productlist'
                    }).
                    when('/networkshoplist/:uuid',{
                        templateUrl:'wisehands/admin/partials/networkShopList.html',
                        controller:'NetworkShopListController',
                        activetab: 'contacts'
                    }).
                    when('/networkshoplist/:uuid/add',{
                        templateUrl:'wisehands/admin/partials/networkShopListAdd.html',
                        controller:'NetworkShopListAddController',
                        activetab: 'contacts'
                    }).
                    when('/networkshoplist/:uuid/delete',{
                        templateUrl:'wisehands/admin/partials/networkShopListDelete.html',
                        controller:'NetworkShopListDeleteController',
                        activetab: 'contacts'
                    }).
                    when('/shops/details/:uuid',{
                          templateUrl:'wisehands/admin/partials/shopsDetails.html',
                          controller:'ShopsDetailsController',
                          activetab: 'productlist'
                    }).
                    when('/shopss/details/:uuid/edit',{
                        templateUrl:'wisehands/admin/partials/shopsDetailsEdit.html',
                        controller:'ShopsDetailsEditController',
                        activetab: 'productlist'
                    }).
                    when('/delivery',{
                        templateUrl:'wisehands/admin/partials/delivery.html',
                        controller:'DeliverySettingsController',
                        activetab: 'delivery'
                    }).
                    when('/delivery/newPost',{
                        templateUrl:'wisehands/admin/partials/newPostDelivery.html',
                        controller:'NewPostDeliveryController',
                        activetab: 'delivery'
                    }).
                    when('/delivery/courier',{
                        templateUrl:'wisehands/admin/partials/courierDelivery.html',
                        controller:'CourierDeliveryController',
                        activetab: 'delivery'
                    }).
                    when('/delivery/selfTake',{
                        templateUrl:'wisehands/admin/partials/selfTakeDelivery.html',
                        controller:'SelfTakeDeliveryController',
                        activetab: 'delivery'
                    }).
                    when('/translation/newPost',{
                        templateUrl:'wisehands/admin/partials/newPostTranslation.html',
                        controller:'NewPostTranslationController',
                        activetab: 'delivery'
                    }).
                    when('/translation/courier',{
                        templateUrl:'wisehands/admin/partials/courierTranslation.html',
                        controller:'CourierTranslationController',
                        activetab: 'delivery'
                    }).
                    when('/translation/selfTake',{
                        templateUrl:'wisehands/admin/partials/selfTakeTranslation.html',
                        controller:'SelfTakeTranslationController',
                        activetab: 'delivery'
                    }).
                    when('/deliveryboundaries',{
                        templateUrl:'wisehands/admin/partials/deliveryBoundaries.html',
                        controller:'DeliveryBounderController',
                        activetab: 'delivery'
                    }).
                    when('/shop/location',{
                        templateUrl:'wisehands/admin/partials/shopLocation.html',
                        controller:'ShopLocationController',
                        activetab: 'contact'
                    }).
                    when('/payment',{
                        templateUrl:'wisehands/admin/partials/payment.html',
                        controller:'PaymentController',
                        activetab: 'payment'
                    }).
                    when('/translation/cash',{
                        templateUrl:'wisehands/admin/partials/paymentCashTranslation.html',
                        controller:'PaymentCashTranslationController',
                        activetab: 'payment'
                    }).
                    when('/translation/cart',{
                        templateUrl:'wisehands/admin/partials/paymentOnlineTranslation.html',
                        controller:'PaymentOnlineTranslationController',
                        activetab: 'payment'
                    }).
                    when('/translation/:objectUuid/:translationUuid',{
                        templateUrl:'wisehands/admin/partials/translation.html',
                        controller:'TranslationController',
                        activetab: 'payment'
                    }).
                    when('/settings',{
                        templateUrl:'wisehands/admin/partials/settings.html',
                        controller:'SettingsController',
                        activetab: 'settings'
                    }).
                    when('/additionsettings',{
                        templateUrl:'wisehands/admin/partials/additionSettings.html',
                        controller:'AdditionSettingsController',
                        activetab: 'additionsettings'
                    }).
                    when('/contacts',{
                        templateUrl:'wisehands/admin/partials/contacts.html',
                        controller:'ContactsController',
                        activetab: 'contacts'
                    }).
                    when('/workinghours',{
                        templateUrl:'wisehands/admin/partials/workingHours.html',
                        controller:'WorkinghoursController',
                        activetab: 'workinghours'
                    }).
                    when('/usersettings',{
                        templateUrl:'wisehands/admin/partials/usersSettings.html',
                        controller:'UsersSettingsController',
                        activetab: 'usersettings'
                    }).
                    when('/transactions',{
                        templateUrl:'wisehands/admin/partials/transactions.html',
                        controller:'TransactionsController',
                        activetab: 'transactions'
                    }).
                    when('/categories',{
                        templateUrl:'wisehands/admin/partials/categories.html',
                        controller:'CategoriesController',
                        activetab: 'productlist'
                    }).
                    when('/discounts',{
                        templateUrl:'wisehands/admin/partials/discounts.html',
                        controller:'DiscountsController',
                        activetab: 'discounts'
                    }).
                    when('/liqpaypayment',{
                        templateUrl:'wisehands/admin/partials/liqPayPayment.html',
                        controller:'LiqPayPaymentController',
                        activetab: 'liqpaypayment'
                    }).
                    when('/viewsettings',{
                        templateUrl:'wisehands/admin/partials/viewSettings.html',
                        controller:'ViewSettingsController',
                        activetab: 'settings'
                    }).
                    when('/discount/:uuid',{
                        templateUrl:'wisehands/admin/partials/pageconstructor.html',
                        controller:'DiscountController',
                        activetab: 'payment'
                    }).
                    when('/analytics',{
                        templateUrl:'wisehands/admin/partials/analytics.html',
                        controller:'AnalyticsController',
                        activetab: 'analytics'
                    }).
                    when('/userprofile',{
                        templateUrl:'wisehands/admin/partials/userProfile.html',
                        controller:'UserProfileController',
                        activetab: 'userprofile'
                    }).
                    when('/category/:categoryUuid/addproperty/:productUuid',{
                        templateUrl:'wisehands/admin/partials/addProperty.html',
                        controller:'AddPropertyController',
                        activetab: 'addproperty'
                    }).
                    when('/product/:productUuid/editProperty/:propertyUuid',{
                        templateUrl:'wisehands/admin/partials/editProperty.html',
                        controller:'EditPropertyController',
                        activetab: 'addproperty'
                    }).
                    when('/paymentcash',{
                        templateUrl:'wisehands/admin/partials/paymentCash.html',
                        controller:'PaymentCashController',
                    }).
                    when('/paymentonline',{
                        templateUrl:'wisehands/admin/partials/paymentOnline.html',
                        controller:'PaymentOnlineController',
                    }).
                    when('/productreviews/:uuid',{
                        templateUrl:'wisehands/admin/partials/productReviews.html',
                        controller:'ProductReviewsController',
                        activetab: 'productlist'

                    }).
                    when('/qrcontroller',{
                        templateUrl:'wisehands/admin/partials/qrMenu.html',
                        controller:'QrMenuController',
                        activetab: 'qr'

                    }).
                    when('/qrnewcode',{
                        templateUrl:'wisehands/admin/partials/qrNewCode.html',
                        controller:'QrNewCodeController',
                        activetab: 'qr'

                    }).
                    when('/qrdetail/:uuid',{
                        templateUrl:'wisehands/admin/partials/qrDetail.html',
                        controller:'QrDetailController',
                        activetab: 'qre'

                    }).
                    when('/qredit/:uuid',{
                        templateUrl:'wisehands/admin/partials/qrEditCode.html',
                        controller:'QrEditCodeController',
                        activetab: 'qre'

                    }).
                    when('/addition',{
                        templateUrl:'wisehands/admin/partials/additions.html',
                        controller:'AdditionMenuController',
                        activetab: 'addition'
                    }).
                    when('/newaddition',{
                        templateUrl:'wisehands/admin/partials/additionNew.html',
                        controller:'AdditionNewController',
                        activetab: 'addition'
                    }).
                    when('/additionedit/:uuid',{
                        templateUrl:'wisehands/admin/partials/additionEdit.html',
                        controller:'AdditionEditController',
                        activetab: 'addition'
                    }).
                    when('/chooseadditions/:productUuid',{
                        templateUrl:'wisehands/admin/partials/chooseAdditions.html',
                        controller:'ChooseAdditionsController',
                        activetab: 'productList'
                    }).
                    otherwise({
                        redirectTo:'/'
                    });
            }])
        .config(
            ['$translateProvider', function ($translateProvider) {
            $translateProvider.useMissingTranslationHandlerLog();
            $translateProvider.useStaticFilesLoader({
                prefix: 'wisehands/admin/resources/locale-',
                suffix: '.json'
            });
            var html = document.getElementsByTagName('html')[0];
            var localization = html.lang;
            localStorage.setItem('locale', localization);
            $translateProvider.preferredLanguage(localization);
            $translateProvider.useSanitizeValueStrategy('escape');
            $translateProvider.use(localization);
            // $translateProvider.useLocalStorage();
        }])
        .config(
            ['tmhDynamicLocaleProvider', function (tmhDynamicLocaleProvider) {
            tmhDynamicLocaleProvider.localeLocationPattern('wisehands/assets/angular-i18n/angular-locale_{{locale}}.js');
        }])

        // XAuthInterceptor
        .factory('XAuthInterceptor', ['$q', function($q){
            return {
                request: function(config){
                    config.headers = config.headers || {};
                    var jwtToken = 'Bearer ' + localStorage.getItem('JWT_TOKEN');
                    config.headers['Authorization'] = jwtToken;
                    return config;
                },
                responseError: function(response){
                    console.log('Interceptor error respponse:', response);
                    if ( response.status === 403 || response.status === 401 ){
                        localStorage.clear();
                        window.location.hash = '';
                        window.location.pathname = '/login';
                    }
                    return $q.reject(response);
                }
            }
        }])
        .config(['$httpProvider', function($httpProvider){
            $httpProvider.interceptors.push('XAuthInterceptor');
        }])
})();
