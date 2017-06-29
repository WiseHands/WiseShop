(function () {
    angular.module('WiseHandsMain', [
            'ngRoute', 'pascalprecht.translate', 'tmh.dynamicLocale',
            'ngCookies', 'ngSanitize'
        ])
        .constant('LOCALES', {
            'locales': {
                'uk_UA': 'Українська',
                'en_US': 'English',
                'pl_PL': 'Polski'
            },
            'preferredLocale': 'en_US'
        })
        .config(['$routeProvider',
            function ($routeProvider) {

                $routeProvider.
                when('/',{
                    templateUrl:'wisehands/login/partials/main.html',
                    controller:'LoginFormController',
                }).
                when('/login',{
                    templateUrl:'wisehands/login/partials/login-form.html',
                    controller:'LoginFormController',
                }).
                when('/register',{
                    templateUrl:'wisehands/login/partials/register-form.html',
                    controller:'RegisterFormController',
                }).
                when('/emailsignin',{
                    templateUrl:'wisehands/login/partials/login_registerForm.html',
                    controller:'LoginFormController',
                }).
                when('/about',{
                    templateUrl:'wisehands/login/partials/about.html',
                    controller:'AboutUsController',
                }).
                when('/registerbygoogle',{
                    templateUrl:'wisehands/login/partials/registerbygoogle.html',
                    controller:'GoogleRegisterController',
                }).
                otherwise({
                    redirectTo:'/'
                });
            }])
        .config([
            '$translateProvider','LOCALES', function ($translateProvider, LOCALES) {
                $translateProvider.useMissingTranslationHandlerLog();

            $translateProvider.useStaticFilesLoader({
                prefix: 'wisehands/login/resources/locale-',
                suffix: '.json'
            });
            $translateProvider.useSanitizeValueStrategy('escape');
            $translateProvider.preferredLanguage(LOCALES.preferredLocale);
            $translateProvider.useLocalStorage();
        }])
        .config(
            ['tmhDynamicLocaleProvider', function (tmhDynamicLocaleProvider) {
            tmhDynamicLocaleProvider.localeLocationPattern('wisehands/assets/angular-i18n/angular-locale_{{locale}}.js');
        }]);
})();
