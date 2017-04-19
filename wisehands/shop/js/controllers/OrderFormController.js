(function(){
    angular.module('WiseShop')
        .controller('OrderFormController', ['$scope', '$http', 'shared',
            function($scope, $http, shared) {
                $scope.phone = localStorage.getItem('phone') || '';
                $scope.name = localStorage.getItem('name') || '';
                $scope.place = localStorage.getItem('address') || '';
                $scope.newPostDelivery = localStorage.getItem('newPostDelivery') || '';

                function loadOptions() {
                    $scope.selectedItems = shared.getSelectedItems();
                    $scope.total =  shared.getTotal();
                }
                loadOptions();

                $http({
                    method: 'GET',
                    url: '/delivery'
                })
                    .then(function successCallback(response) {
                        $scope.deliverance = response.data;
                        $scope.minOrderForFreeDelivery = $scope.deliverance.courierFreeDeliveryLimit;
                        if ($scope.deliverance.isCourierAvailable){
                            $("#radio1").click();
                        } else if ($scope.deliverance.isNewPostAvailable){
                            $("#radio2").click();
                        } else if ($scope.deliverance.isSelfTakeAvailable){
                            $("#radio3").click();
                        }
                    }, function errorCallback(error) {
                        console.log(error);
                    });

                $http({
                    method: 'GET',
                    url: '/shop/details/public'
                })
                    .then(function successCallback(response) {
                        $scope.shopName = response.data.name;
                        $scope.shopId = response.data.uuid;
                        $scope.couponsEnabled = response.data.couponsEnabled;
                    }, function errorCallback(error) {
                        console.log(error);
                    });

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

                    if (deliveryType === 'SELFTAKE') {
                        document.getElementById('address').value = '';
                        document.getElementById('newPostDepartment').value = '';

                    }

                    $scope.params = {
                        deliveryType: deliveryType,
                        phone: new String(document.getElementById('phone').value),
                        name: document.getElementById('name').value,
                        address: document.getElementById('address').value,
                        newPostDepartment: document.getElementById('newPostDepartment').value,
                        selectedItems: $scope.selectedItems,
                        comment: document.getElementById('comment').value,
                        coupon: document.getElementById('couponId').value,
                        addressLat: localStorage.getItem('addressLat'),
                        addressLng: localStorage.getItem('addressLng')
                    };
                    var encodedParams = encodeQueryData($scope.params);

                    $http({
                        method: 'POST',
                        url: '/order',
                        data: $scope.params
                    })
                        .then(function successCallback(response) {
                            $scope.loading = false;
                            $scope.successfullResponse = true;
                            var modalContent = document.querySelector(".proceedWithPayment");
                            modalContent.innerHTML = response.data.button;
                            shared.setPaymentButton(modalContent.innerHTML);
                            $scope.currentOrderUuid = response.data.uuid;
                            shared.setCurrentOrderUuid($scope.currentOrderUuid);
                            window.location.hash ='#!/paymentstage';
                        }, function errorCallback(data) {
                            $scope.loading = false;
                            console.log(data);
                        });
                };
                $scope.isCouponValid = true;
                $scope.applyCoupon = function (couponId) {
                    $scope.loading = true;
                    $http({
                        method: 'POST',
                        url: '/coupon/' + couponId
                    })
                        .then(function successCallback(response) {
                            $scope.isCouponValid = true;
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
                            $scope.isCouponValid = false;
                            $scope.loading = false;
                            console.log(data);
                        });
                };
                $scope.customerData = function () {
                    localStorage.setItem('name', $scope.name);
                    localStorage.setItem('phone', $scope.phone);
                    if ($scope.place && $scope.place.formatted_address){
                        localStorage.setItem('address', $scope.place.formatted_address);
                        localStorage.setItem('addressLat', $scope.place.geometry.location.lat());
                        localStorage.setItem('addressLng', $scope.place.geometry.location.lng());
                    }
                    if (!$scope.place.formatted_address) {
                        localStorage.setItem('addressLat', '');
                        localStorage.setItem('addressLng', '');
                    }
                    if ($scope.newPostDelivery) {
                        localStorage.setItem('newPostDelivery', $scope.newPostDelivery);
                    }
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