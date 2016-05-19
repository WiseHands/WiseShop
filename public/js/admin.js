/**
 * Created by Reverie on 05/19/2016.
 */
(function () {
    angular.module('adminView', [])
        .controller('AdminController', function ($scope, $http) {
            $http({
                method: 'GET',
                url: '/orders'
            })
            .then(function successCallback(response) {
                var data = response.data;
                if(data.length === 0) {
                    $scope.status = 'Замовлення відсутні';
                } else {
                    $scope.orders = response.data;
                }
            }, function errorCallback(data) {
                $scope.status = 'Щось пішло не так...';
            });
        })
})();
