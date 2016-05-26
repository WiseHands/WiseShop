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
                    $scope.deleteOrder = function () {
                        $http({
                            method: 'DELETE',
                            url: '/order/' + $routeParams.uuid
                        });
                            // .then(function successCallback(response) {
                            //     var data = response.data;
                            //     if(data.length === 0) {
                            //         $scope.status = 'Замовлення відсутні';
                            //     } else {
                            //         $scope.order = response.data;
                            //         console.log($scope.order);
                            //     }
                            // }, function errorCallback(data) {
                            //     $scope.status = 'Щось пішло не так...';
                            // });
                    }
            }])
        .directive('ngFiles', ['$parse', function ($parse) {

            function fn_link(scope, element, attrs) {
                var onChange = $parse(attrs.ngFiles);
                element.on('change', function (event) {
                    onChange(scope, { $files: event.target.files });
                });
            };

            return {
                link: fn_link
            }
        } ])
        .controller('SubmitNewProductCtrl', function ($scope, $http) {
            var formdata = new FormData();
            $scope.getTheFiles = function ($files) {
                formdata.append('photo', $files[0]);
            };
            $scope.submitProduct = function () {
                formdata.append('name', $scope.product.name);
                formdata.append('description', $scope.product.description);

                var request = {
                    method: 'POST',
                    url: '/product',
                    data: formdata,
                    headers: {
                        'Content-Type': undefined
                    }
                };
                $http(request)
                    .success(function (data) {
                        alert(data);
                    })
                    .error(function () {
                        console.log(error);
                    });
            };
        })
})();
