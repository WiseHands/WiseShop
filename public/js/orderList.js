/**
 * Created by Reverie on 05/20/2016.
 */
(function () {
    angular.module('orderList', [])
        .controller('orderListController', function ($scope, $http, shared, $window) {
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

            $scope.orderState = function(item){
                if (item.state === "NEW"){
                    return '#0B1BF2';
                } else if (item.state === "PAYED") {
                    return '#00BA0D';
                } else if (item.state === "CANCELLED") {
                    return '#BC0005';
                } else if (item.state === "SHIPPED") {
                    return '#9715BC';
                } else if (item.state === "RETURNED") {
                    return '#A27C20';
                }
            };            
            function loadOptions() {
                $scope.options = shared.getFilterOptions();
            }

            loadOptions();

            $scope.orderFilter = function(item) {
                if ($scope.options.length > 0) {
                    if ($.inArray(item.state, $scope.options) < 0)
                        return;
                }

                return item;
            };
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
                $scope.deleteMessage = 'Ви дійсно хочете видалити дане замовлення?';
                $scope.hideModal = function () {
                    $('#deleteProduct').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                };
                $scope.deleteOrder = function () {
                    $http({
                        method: 'DELETE',
                        url: '/order/' + $routeParams.uuid
                    })
                        .then(function successCallback(response) {
                            $scope.deleteMessage = 'Замовлення видалене.';
                            $scope.deleteButton = true;
                        }, function errorCallback(error) {
                            console.log(error);
                        });
                };
                $scope.orderState = function(order){
                    if (!order) return;
                    if (order.state === "NEW"){
                        return 'Нове';
                    } else if (order.state === "PAYED") {
                        return 'Оплачено';
                    } else if (order.state === "CANCELLED") {
                        return 'Скасовано';
                    } else if (order.state === "SHIPPED") {
                        return 'Надіслано';
                    } else if (order.state === "RETURNED") {
                        return 'Повернено';
                    }
                };
                $scope.payedOrder = function () {
                    $http({
                        method: 'PUT',
                        url: '/order/' + $routeParams.uuid + '/payed'
                    })
                        .then(function successCallback(response){
                            $scope.order = response.data;
                        }, function errorCallback(error){
                            console.log(error);
                        });
                };
                $scope.cancelledOrder = function () {
                    $http({
                        method: 'PUT',
                        url: '/order/' + $routeParams.uuid + '/cancelled'
                    })
                        .then(function successCallback(response){
                            $scope.order = response.data;
                        }, function errorCallback(error){
                            console.log(error);
                        });
                };
                $scope.shippedOrder = function () {
                    $http({
                        method: 'PUT',
                        url: '/order/' + $routeParams.uuid + '/shipped'
                    })
                        .then(function successCallback(response){
                            $scope.order = response.data;
                        }, function errorCallback(error){
                            console.log(error);
                        });
                };
                $scope.returnedOrder = function () {
                    $http({
                        method: 'PUT',
                        url: '/order/' + $routeParams.uuid + '/returned'
                    })
                        .then(function successCallback(response){
                            $scope.order = response.data;
                        }, function errorCallback(error){
                            console.log(error);
                        });
                };
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
                    url: '/product',
                    data: formdata,
                    headers: {
                        'Content-Type': undefined
                    }
                };
                $http(request)
                    .success(function (data) {
                        $location.path('/product/details/' + data.uuid);
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
                    url: '/product/' + $routeParams.uuid
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
                        url: '/product/' + $routeParams.uuid
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
                        url: '/product/' + $routeParams.uuid,
                        data: $scope.product
                    })
                        .then(function successCallback(response) {
                            $location.path('/product/details/' + response.data.uuid);
                        }, function errorCallback(error) {
                            console.log(error);
                        });

                }
            }])
        .controller('FilterOptionsController', function ($scope, shared){
            $scope.filterOptions = shared.filterOptions || [];
            
            $scope.orderStateFilter = function (orderState) {
                var i = $.inArray(orderState, $scope.filterOptions);
                if (i > -1) {
                    $scope.filterOptions.splice(i, 1);
                    shared.setFilterOptions($scope.filterOptions);
                } else {
                    $scope.filterOptions.push(orderState);
                    shared.setFilterOptions($scope.filterOptions);
                }
            };

            $scope.isOptionChecked = function (type) {
              return $.inArray(type, $scope.filterOptions) > -1;
            };
            function loadOptions() {
                $scope.filterOptions = shared.getFilterOptions();
            }
            loadOptions();
        })
})();
