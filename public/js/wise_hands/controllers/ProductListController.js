angular.module('WiseHands')
    .controller('ProductListController', function ($scope, $http, $route, spinnerService) {
        $scope.$route = $route;
        $scope.getResource = function () {
            spinnerService.show('mySpinner');
        $http({
            method: 'GET',
            url: '/products'
        })
            .then(function successCallback(response) {
                spinnerService.hide('mySpinner');
                var data = response.data;
                if(data.length === 0) {
                    $scope.status = 'Товари відсутні';
                } else {
                    $scope.products = response.data;
                }
            }, function errorCallback(data) {
                spinnerService.hide('mySpinner');
                $scope.status = 'Щось пішло не так...';
            });
        };
    });