(function(){
    angular.module('WiseShop')
        .controller('ProductDetailsController', ['$scope', '$http', '$location', '$routeParams','shared', 'PublicShopInfo',
            function($scope, $http, $location, $routeParams, shared, PublicShopInfo) {
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

                    $scope.loading = true;
                    var deliveryType;
                    if (document.getElementById('radio1').checked) {
                        deliveryType = document.getElementById('radio1').value;
                    } else if (document.getElementById('radio2').checked) {
                        deliveryType = document.getElementById('radio2').value;
                    } else if(document.getElementById('radio3').checked) {
                        deliveryType = document.getElementById('radio3').value;
                    }
                    var params = {
                        deliveryType: deliveryType,
                        phone: new String(document.getElementById('phone').value),
                        name: document.getElementById('name').value,
                        address: document.getElementById('address').value,
                        newPostDepartment: document.getElementById('newPostDepartment').value,
                        selectedItems: $scope.selectedItems,
                        comment: document.getElementById('comment').value,
                        coupon: document.getElementById('couponId').value
                    };

                    var encodedParams = encodeQueryData(params);

                    $http({
                        method: 'POST',
                        url: '/order',
                        data: params
                    })
                        .then(function successCallback(response) {
                            $scope.loading = false;
                            $scope.successfullResponse = true;
                            var modalContent = document.querySelector(".proceedWithPayment");
                            modalContent.innerHTML = response.data.button;
                            $scope.currentOrderUuid = response.data.uuid;
                        }, function errorCallback(data) {
                            $scope.loading = false;
                            console.log(data);
                        });
                };
                $scope.payOrder = function () {
                    $("#paymentButton").click(function(e) {
                        var rootDiv = document.querySelector('.proceedWithPayment');
                        rootDiv.firstChild.submit();
                    });
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
                    $scope.selectedItems = [];
                    $('#cart-modal-ex').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    $scope.successfullResponse = false;
                };

                $scope.applyCoupon = function (couponId) {
                    $scope.loading = true;
                    $http({
                        method: 'POST',
                        url: '/coupon/' + couponId
                    })
                        .then(function successCallback(response) {
                            $scope.couponPlans = response.data;
                            var discountTotalMatch = [];
                            $scope.couponPlans.forEach(function (couponPlan) {
                                if (couponPlan.minimalOrderTotal <= $scope.total){
                                    discountTotalMatch.push(couponPlan.minimalOrderTotal);
                                }
                            });
                            var largest = Math.max.apply(0, discountTotalMatch);
                            $scope.couponPlans.forEach(function (couponPlan) {
                                if (couponPlan.minimalOrderTotal === largest){
                                    $scope.currentPlan = couponPlan.minimalOrderTotal;
                                    $scope.total = $scope.total - ($scope.total * couponPlan.percentDiscount)/100;
                                }
                            });
                            $scope.discountError = '';
                            $scope.loading = false;
                        }, function errorCallback(data) {
                            $scope.discountError = 'Такий купон вже використаний або його не існує';
                            $scope.loading = false;
                            console.log(data);
                        });
                };
            }]);


})();

function encodeQueryData(data)
{
    var ret = [];
    for (var d in data)
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
}