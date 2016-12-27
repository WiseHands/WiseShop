(function(){
    angular.module('WiseShop')
        .controller('ProductDetailsController', ['$scope', '$http', '$location', '$routeParams','shared', 'PublicShopInfo', 'OrderHandling',
            function($scope, $http, $location, $routeParams, shared, PublicShopInfo, OrderHandling) {
            $scope.uuid = $routeParams.uuid;
            
            $http({
                method: 'GET',
                url: '/products'
            })
                .then(function successCallback(response) {
                    $scope.products = response.data;
                }, function errorCallback(error) {
                    console.log(error);
                });

            $http({
                method: 'GET',
                url: '/product/' + $scope.uuid
            })
                .then(function successCallback(response) {
                    $scope.product = response.data;
                    $("meta[name='description']").attr('content', $scope.product.description);
                    document.title = $scope.product.name + " | " + $scope.product.categoryName;
                    $scope.product.images.forEach(function(image, index){
                        if(image.uuid === $scope.product.mainImage.uuid){
                            $scope.selected = index;
                        }
                    });
                    $scope.found = false;
                    for(var i = 0; i < $scope.selectedItems.length; i++) {
                        if ($scope.selectedItems[i].uuid === $scope.product.uuid) {
                            $scope.found = true;
                            break;
                        }
                    }
                    $scope.loading = false;
                }, function errorCallback(error) {
                    $scope.loading = false;
                    console.log(error);
                });

            $scope.select= function(index) {
                $scope.selected = index;
            };
                
            $http({
                method: 'GET',
                url: '/delivery'
            })
                .then(function successCallback(response) {
                    PublicShopInfo.handleDeliveranceInfo($scope, response);
                }, function errorCallback(error) {
                    console.log(error);
                });

            $http({
                method: 'GET',
                url: '/shop/details/public'
            })
                .then(function successCallback(response) {
                    PublicShopInfo.handlePublicShopInfo($scope, response);
                }, function errorCallback(error) {
                    console.log(error);
                });

                function loadOptions() {
                    $scope.selectedItems = shared.getSelectedItems();
                    $scope.totalItems = shared.getTotalItems();
                }

                loadOptions();
                $scope.calculateTotal = PublicShopInfo.calculateTotal;
                $scope.reCalculateTotal = function (){
                    $scope.calculateTotal($scope);
                };
                $scope.buyStart = function () {

                    PublicShopInfo.handleWorkingHours($scope);

                    if($scope.isNotWorkingTime) {
                        toastr.warning('Ми працюємо з ' + $scope.startHour + '-' + $scope.startMinute + ' до ' + $scope.endHour + '-' + $scope.endMinute);
                    } else {
                        if (!$scope.found) {
                            $scope.product.quantity = 1;
                            $scope.selectedItems.push($scope.product);
                            $scope.calculateTotal($scope);
                            shared.setSelectedItems($scope.selectedItems);

                            for(var i = 0; i < $scope.selectedItems.length; i++) {
                                if ($scope.selectedItems[i].uuid === $scope.product.uuid) {
                                    $scope.found = true;
                                    var productFromBin = $scope.selectedItems[i];
                                    break;
                                }
                            }
                        } else {
                            for(var i = 0; i < $scope.selectedItems.length; i++) {
                                if ($scope.selectedItems[i].uuid === $scope.product.uuid) {
                                    $scope.found = true;
                                    var productFromBin = $scope.selectedItems[i];
                                    productFromBin.quantity ++;
                                    $scope.calculateTotal($scope);
                                    shared.setSelectedItems($scope.selectedItems);

                                    break;
                                }
                            }
                        }
                    }
                };

                $scope.removeSelectedItem = function (index){
                    if ($scope.selectedItems[index].uuid === $scope.product.uuid) {
                        $scope.found = false;
                    }
                    $scope.selectedItems.splice(index, 1);
                    $scope.calculateTotal($scope);
                    shared.setSelectedItems($scope.selectedItems);
                };

                $scope.removeAll = function () {
                    $scope.selectedItems = [];
                    $scope.calculateTotal($scope);
                    shared.setSelectedItems($scope.selectedItems);
                    $scope.found = false;
                };

                $scope.makeOrder = function (){
                    OrderHandling.prepareOrderInfo($scope);
                    
                    $http({
                        method: 'POST',
                        url: '/order',
                        data: $scope.params
                    })
                        .then(function successCallback(response) {
                            OrderHandling.handleOrderData($scope, response);
                        }, function errorCallback(data) {
                            $scope.loading = false;
                            console.log(data);
                        });
                };
                $scope.payOrder = function () {
                    OrderHandling.payOrder();
                };

                $scope.payLater = function () {
                    $http({
                        method: 'PUT',
                        url: '/order/' + $scope.currentOrderUuid + '/manually-payed'
                    })
                        .then(function successCallback(response) {
                            window.location.pathname = '/done';
                        }, function errorCallback(data) {
                            console.log(data);
                        });
                };

                $scope.applyCoupon = function (couponId) {
                    $scope.loading = true;
                    $http({
                        method: 'POST',
                        url: '/coupon/' + couponId
                    })
                        .then(function successCallback(response) {
                            OrderHandling.couponSuccess($scope, response);
                        }, function errorCallback(data) {
                            $scope.discountError = 'Такий купон вже використаний або його не існує';
                            $scope.loading = false;
                            console.log(data);
                        });
                };
            }]);


})();
