angular.module('WiseShop')
    .controller('CategoryDetailsController', ['$scope', '$http','shared','sideNavInit', '$routeParams',
        function($scope, $http, shared, sideNavInit, $routeParams) {
            $scope.uuid = $routeParams.uuid;
            shared.setCategoryUuid($scope.uuid);
            $http({
                method: 'GET',
                url: '/category/' + $scope.uuid

            })
                .then(function successCallback(response) {
                    $scope.products = response.data;
                    $('input:radio[name=deliverance]:not(:disabled):first').click();
                }, function errorCallback(data) {
                    console.log(data);
                });


            $http({
                method: 'GET',
                url: '/delivery'
            })
                .then(function successCallback(response) {
                    $scope.deliverance = response.data;
                    $scope.minOrderForFreeDelivery = $scope.deliverance.courierFreeDeliveryLimit;
                }, function errorCallback(error) {
                    console.log(error);
                });



            $http({
                method: 'GET',
                url: '/shop/details/public'
            })
                .then(function successCallback(response) {
                    $scope.couponsEnabled = response.data.couponsEnabled;
                    document.title = response.data.name;
                    $scope.shopName = response.data.name;
                    $scope.shopId = response.data.uuid;
                    $scope.payLateButton = response.data.manualPaymentEnabled;
                    $scope.startTime = new Date(response.data.startTime);
                    $scope.startHour = ($scope.startTime.getHours()<10?'0':'') + $scope.startTime.getHours();
                    $scope.startMinute = ($scope.startTime.getMinutes()<10?'0':'') + $scope.startTime.getMinutes();
                    $scope.endTime = new Date(response.data.endTime);
                    $scope.endHour = ($scope.endTime.getHours()<10?'0':'') + $scope.endTime.getHours();
                    $scope.endMinute = ($scope.endTime.getMinutes()<10?'0':'') + $scope.endTime.getMinutes();

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

            $scope.delivery = function () {
                if ($scope.delivery.radio === 'NOVAPOSHTA') {
                }
                if ($scope.delivery.radio === 'COURIER') {
                    if($scope.total < $scope.minOrderForFreeDelivery){
                        return ' + ' + $scope.deliverance.courierPrice;
                    } else {
                        return '';
                    }
                } else if ($scope.delivery.radio === 'SELFTAKE'){
                    return '';
                }

                return '';
            };

            function loadOptions() {
                $scope.selectedItems = shared.getSelectedItems();
                $scope.totalItems = shared.getTotalItems();
            }

            loadOptions();

            $scope.buyStart = function (productDTO, $event) {

                $scope.selectedItems.forEach(function (selectedItem) {
                    if(selectedItem.uuid === productDTO.uuid){
                        $scope.found = true;
                        $scope.productFromBin = selectedItem;
                    }
                });
                
                var today = new Date();

                var startMinutes = $scope.startTime.getHours() * 60 + $scope.startTime.getMinutes();
                var endMinutes = $scope.endTime.getHours() * 60 + $scope.endTime.getMinutes();
                var nowMinutes = today.getHours() * 60 + today.getMinutes();

                var isNotWorkingTime = nowMinutes < startMinutes || nowMinutes >= endMinutes;

                if(isNotWorkingTime) {
                    toastr.warning('Ми працюємо з ' + $scope.startHour + '-' + $scope.startMinute + ' до ' + $scope.endHour + '-' + $scope.endMinute);
                } else if (!$scope.found){
                    if ($scope.selectedItems.indexOf(productDTO) == -1) {
                        productDTO.quantity = 1;
                        $scope.selectedItems.push(productDTO);
                        shared.setSelectedItems($scope.selectedItems);
                        $scope.calculateTotal();

                    } else {
                        productDTO.quantity ++;
                        shared.setSelectedItems($scope.selectedItems);
                        $scope.calculateTotal();
                    }
                    if ($event.stopPropagation) $event.stopPropagation();
                    if ($event.preventDefault) $event.preventDefault();
                    $event.cancelBubble = true;
                    $event.returnValue = false;

                    $scope.totalItems = 0;
                    $scope.selectedItems.forEach(function(selectedItem) {
                        $scope.totalItems += selectedItem.quantity;

                    });

                } else {
                    $scope.productFromBin.quantity ++;
                    $scope.calculateTotal();
                    shared.setSelectedItems($scope.selectedItems);
                }

            };

            $scope.removeSelectedItem = function (index){
                $scope.selectedItems.splice(index, 1);
                $scope.calculateTotal();
                shared.setSelectedItems($scope.selectedItems);

            };

            $scope.removeAll = function () {
                $scope.selectedItems.length = 0;
                $scope.calculateTotal();
                shared.setSelectedItems($scope.selectedItems);

            };

            $scope.calculateTotal = function(){
                $scope.total = 0;
                $scope.totalItems = 0;
                for(var i =0; i < $scope.selectedItems.length; i++){
                    var item = $scope.selectedItems[i];
                    $scope.total += (item.quantity * item.price);
                    $scope.totalItems += item.quantity;

                }
                shared.setTotalItems($scope.totalItems);

            };

            $scope.makeOrder = function (){


                $scope.loading = true;

                var params = {
                    deliveryType: $scope.delivery.radio,
                    phone: new String(document.getElementById('phone').value),
                    name: document.getElementById('name').value,
                    address: document.getElementById('address').value,
                    newPostDepartment: $scope.delivery.newPost,
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
