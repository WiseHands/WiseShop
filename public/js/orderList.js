/**
 * Created by Reverie on 05/20/2016.
 */
(function () {
    angular.module('orderList', [])
        .controller('orderListController', function ($scope, $http) {
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
        .controller('SingleOrderCtrl', ['$http', '$scope', '$routeParams',
            function($http, $scope, $routeParams) {
                $scope.uuid = $routeParams.uuid;
                    $http({
                        method: 'GET',
                        url: '/order/' + $routeParams.uuid
                    })
                        .then(function successCallback(response) {
                            var data = response.data;
                            if(data.length === 0) {
                                $scope.status = 'Замовлення відсутні';
                            } else {
                                $scope.order = response.data;
                                console.log($scope.order);
                            }
                        }, function errorCallback(data) {
                            $scope.status = 'Щось пішло не так...';
                        });                    
            }]);

})();
