angular.module('WiseHands')
    .directive('ngCurrencySelect', ['LocaleService', function (LocaleService) { 'use strict';

        return {
            restrict: 'A',
            replace: true,
            template: ''+
            '<div class="language-select" ng-if="visible">'+
            '<p>'+
            '{{"directives.currency-select.Currency" | translate}}:'+
            '<select class="form-control" ng-model="currentLocaleDisplayName"'+
            'ng-options="localesDisplayName for localesDisplayName in localesDisplayNames"'+
            'ng-change="changeLanguage(currentLocaleDisplayName); changeLocale(currentLocaleDisplayName)">'+
            '</select>'+
            '</p>'+
            '</div>'+
            '',
            controller: ['$scope','$http', function ($scope, $http) {
                $scope.currentLocaleDisplayName = LocaleService.getLocaleDisplayName();
                $scope.localesDisplayNames = LocaleService.getLocalesDisplayNames();
                $scope.visible = $scope.localesDisplayNames &&
                    $scope.localesDisplayNames.length > 1;

                $scope.changeLanguage = function (locale) {
                    LocaleService.setLocaleByDisplayName(locale);

                };
                $scope.changeLocale = function (language) {
                    var currentLocale = '';
                    if (language === 'Українська') {
                        currentLocale = 'uk_UA'
                    } else if (language === 'English') {
                        currentLocale = 'en_US'
                    } else if (language === 'Polski') {
						currentLocale = 'pl_PL'
					}
                    $http({
                        method: 'PUT',
                        url: '/shop/' + currentLocale
                    })
                        .success(function (response) {
                            localStorage.setItem('locale', currentLocale);
                        }).
                    error(function (response) {
                        $scope.loading = false;
                        console.log(response);
                    });
                };
            }]
        };
    }]);