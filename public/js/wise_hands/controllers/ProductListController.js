angular.module('WiseHands')
    .controller('ProductListController', function ($scope, $http, $route, spinnerService) {
        $scope.$route = $route;

        $scope.activeShop = {
            domain: '',
            shopName: ''
        };
        
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

        $http({
            method: 'GET',
            url: '/shop/details',
            headers: {
                'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
            }
        })
            .then(function successCallback(response) {
                $scope.activeShop = response.data;

            }, function errorCallback(data) {
                $scope.status = 'Щось пішло не так...';
            });

        $scope.getUrl = function (shop) {
            return  window.location.protocol + '//' + shop.domain + ':' + window.location.port;
        }
        
    });