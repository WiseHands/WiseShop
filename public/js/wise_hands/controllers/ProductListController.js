angular.module('WiseHands')
    .controller('ProductListController', function ($scope, $http, $route) {
        $scope.$route = $route;
        $http({
            method: 'GET',
            url: '/products'
        })
            .then(function successCallback(response) {
                var data = response.data;
                if(data.length === 0) {
                    $scope.status = 'Товари відсутні';
                } else {
                    $scope.products = response.data;
                }
            }, function errorCallback(data) {
                $scope.status = 'Щось пішло не так...';
            });
    });