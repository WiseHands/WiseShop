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
            'ng-change="changeLanguage(currentLocaleDisplayName)">'+
            '</select>'+
            '</p>'+
            '</div>'+
            '',
            controller: ['$scope', function ($scope) {
                $scope.currentLocaleDisplayName = LocaleService.getLocaleDisplayName();
                $scope.localesDisplayNames = LocaleService.getLocalesDisplayNames();
                $scope.visible = $scope.localesDisplayNames &&
                    $scope.localesDisplayNames.length > 1;

                $scope.changeLanguage = function (locale) {
                    LocaleService.setLocaleByDisplayName(locale);
                };
            }]
        };
    }]);