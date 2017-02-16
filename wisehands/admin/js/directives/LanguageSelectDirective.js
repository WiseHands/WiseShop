angular.module('WiseHands')
    .directive('ngTranslateLanguageSelect', ['LocaleService', function (LocaleService) { 'use strict';

        return {
            restrict: 'A',
            replace: true,
            template: ''+
            '<div class="language-select" ng-if="visible">'+
            '<p>'+
            '{{"directives.language-select.Language" | translate}}:'+
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
                    }
                    $http({
                        method: 'PUT',
                        url: '/shop/' + currentLocale,
                        headers: {
                            'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                            'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                        }
                    })
                        .success(function (response) {
                            localStorage.setItem('locale', currentLocale);
                        }).
                    error(function (response) {
                        if (response.data === 'Invalid X-AUTH-TOKEN') {
                            signout.signOut();
                        }
                        $scope.loading = false;
                        console.log(response);
                    });
                };
            }]
        };
    }]);