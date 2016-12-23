angular.module('WiseShop')
    .controller('CategoryDetailsController', ['$scope', '$http','shared','sideNavInit', '$routeParams', 'PublicShopInfo',
        function($scope, $http, shared, sideNavInit, $routeParams, PublicShopInfo) {
            $scope.uuid = $routeParams.uuid;
            shared.setCategoryUuid($scope.uuid);
            $http({
                method: 'GET',
                url: '/category/' + $scope.uuid

            })
                .then(function successCallback(response) {
                    $scope.products = response.data;
                }, function errorCallback(data) {
                    console.log(data);
                });

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

            // $scope.init = function() {
            //     var placeSearch, autocomplete;
            //     var componentForm = {
            //         street_number: 'short_name',
            //         route: 'long_name',
            //         locality: 'long_name',
            //         administrative_area_level_1: 'short_name',
            //         country: 'long_name',
            //         postal_code: 'short_name'
            //     };
            //
            //     function geolocate() {
            //         if (navigator.geolocation) {
            //             navigator.geolocation.getCurrentPosition(function(position) {
            //                 var geolocation = {
            //                     lat: position.coords.latitude,
            //                     lng: position.coords.longitude
            //                 };
            //                 var circle = new google.maps.Circle({
            //                     center: geolocation,
            //                     radius: position.coords.accuracy
            //                 });
            //                 autocomplete.setBounds(circle.getBounds());
            //             });
            //         }
            //     }
            // };

            function loadOptions() {
                $scope.selectedItems = shared.getSelectedItems();
                $scope.totalItems = shared.getTotalItems();
            }

            loadOptions();
            $scope.calculateTotal = PublicShopInfo.calculateTotal;
            $scope.reCalculateTotal = function (){
                $scope.calculateTotal($scope);
            };
            $scope.buyStart = function (productDTO) {

                $scope.selectedItems.forEach(function (selectedItem) {
                    if(selectedItem.uuid === productDTO.uuid){
                        $scope.found = true;
                        $scope.productFromBin = selectedItem;
                    }
                });

                PublicShopInfo.handleWorkingHours($scope);

                if($scope.isNotWorkingTime) {
                    toastr.warning('Ми працюємо з ' + $scope.startHour + '-' + $scope.startMinute + ' до ' + $scope.endHour + '-' + $scope.endMinute);
                } else if (!$scope.found){
                    if ($scope.selectedItems.indexOf(productDTO) == -1) {
                        productDTO.quantity = 1;
                        $scope.selectedItems.push(productDTO);
                        shared.setSelectedItems($scope.selectedItems);
                        $scope.calculateTotal($scope);

                    } else {
                        productDTO.quantity ++;
                        shared.setSelectedItems($scope.selectedItems);
                        $scope.calculateTotal($scope);
                    }

                    $scope.totalItems = 0;
                    $scope.selectedItems.forEach(function(selectedItem) {
                        $scope.totalItems += selectedItem.quantity;

                    });

                } else {
                    $scope.productFromBin.quantity ++;
                    $scope.calculateTotal($scope);
                    shared.setSelectedItems($scope.selectedItems);
                }

            };

            $scope.removeSelectedItem = function (index){
                $scope.selectedItems.splice(index, 1);
                $scope.calculateTotal($scope);
                shared.setSelectedItems($scope.selectedItems);

            };

            $scope.removeAll = function () {
                $scope.selectedItems.length = 0;
                $scope.calculateTotal($scope);
                shared.setSelectedItems($scope.selectedItems);

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
            sideNavInit.sideNav();
            
        }]);

function encodeQueryData(data)
{
    var ret = [];
    for (var d in data)
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
}
