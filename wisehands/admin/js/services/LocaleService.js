angular.module('WiseHands')
    .service('LocaleService',  ['$translate', 'LOCALES', '$rootScope', 'tmhDynamicLocale',
        function ($translate, LOCALES, $rootScope, tmhDynamicLocale) {
        'use strict';
        var localesObj = LOCALES.locales;

        var _LOCALES = Object.keys(localesObj);
        if (!_LOCALES || _LOCALES.length === 0) {
            console.error('There are no _LOCALES provided');
        }
        var _LOCALES_DISPLAY_NAMES = [];
        _LOCALES.forEach(function (locale) {
            _LOCALES_DISPLAY_NAMES.push(localesObj[locale]);
        });

        var currentLocale = $translate.proposedLanguage();
        var checkLocaleIsValid = function (locale) {
            return _LOCALES.indexOf(locale) !== -1;
        };

        var setLocale = function (locale) {
            if (!checkLocaleIsValid(locale)) {
                console.error('Locale name "' + locale + '" is invalid');
                return;
            }
            currentLocale = locale;

            $translate.use(locale);
        };

        $rootScope.$on('$translateChangeSuccess', function (event, data) {
            document.documentElement.setAttribute('lang', data.language);

            tmhDynamicLocale.set(data.language.toLowerCase().replace(/_/g, '-'));
        });
        return {
            getLocaleDisplayName: function () {
                var currentLocale2 = localStorage.getItem('NG_TRANSLATE_LANG_KEY');
                return localesObj[currentLocale2];
            },
            setLocaleByDisplayName: function (localeDisplayName) {
                setLocale(
                    _LOCALES[
                        _LOCALES_DISPLAY_NAMES.indexOf(localeDisplayName)// get locale index
                        ]
                );
            },
            getLocalesDisplayNames: function () {
                return _LOCALES_DISPLAY_NAMES;
            }
        };
    }]);
