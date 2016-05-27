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
        .controller('SubmitNewProductCtrl', function ($scope, $location, $http) {
            var formdata = new FormData();
            $scope.getTheFiles = function ($files) {
                formdata.append('photo', $files[0]);
            };
            $scope.submitProduct = function () {
                formdata.append('name', $scope.product.name);
                formdata.append('description', $scope.product.description);
                formdata.append('price', $scope.product.price);


                var request = {
                    method: 'POST',
                    url: '/products',
                    data: formdata,
                    headers: {
                        'Content-Type': undefined
                    }
                };
                $http(request)
                    .success(function (data) {
                        $location.path('/products/details/' + data.uuid);
                    })
                    .error(function () {
                        console.log(error);
                    });
            };
        })
        .controller('ProductListCtrl', function ($scope, $http) {
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
        })
        .controller('ProductDetailsCtrl', ['$http', '$scope', '$routeParams', '$location',
            function($http, $scope, $routeParams, $location) {
                $scope.uuid = $routeParams.uuid;
                $http({
                    method: 'GET',
                    url: '/products/' + $routeParams.uuid
                })
                    .then(function successCallback(response) {
                            $scope.product = response.data;
                            console.log($scope.product);
                    }, function errorCallback(error) {
                        console.log(error);
                    });
                $scope.deleteMessage = 'Ви дійсно хочете видалити даний товар?';
                $scope.hideModal = function () {
                    $('#deleteProduct').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                };
                $scope.deleteProduct = function () {
                    $http({
                        method: 'DELETE',
                        url: '/products/' + $routeParams.uuid
                    })
                        .then(function successCallback(response) {
                            $scope.deleteMessage = 'Товар видалений.';
                            $scope.deleteButton = true;

                        }, function errorCallback(error) {
                            console.log(error);
                        });

                };
                $scope.updateProduct = function () {
                    $http({
                        method: 'PUT',
                        url: '/products/' + $routeParams.uuid,
                        data: $scope.product
                    })
                        .then(function successCallback(response) {
                            $location.path('/products/details/' + response.data.uuid);
                        }, function errorCallback(error) {
                            console.log(error);
                        });

                }
            }])
})();
