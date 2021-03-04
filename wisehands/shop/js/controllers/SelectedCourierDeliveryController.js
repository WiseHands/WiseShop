(function(){
    angular.module('WiseShop')
        .controller('SelectedCourierDeliveryController', ['$scope', '$http', 'shared',
            function($scope, $http, shared) {

                var paymentButton = document.querySelector(".proceedWithPayment");
                paymentButton.innerHTML = $scope.paymentButton;


                $http({
                    method: 'GET',
                    url: '/courier/polygon'
                }).then(function successCallback(response) {
                      let objjson = JSON.parse(response.data);
                      if(isEmpty(objjson)){
                        document.getElementById('address').disabled = false;
                      }
                      console.log("loadPolygons response:",   isEmpty(objjson), objjson);
                    }, function errorCallback(data) {
                        $scope.status = 'Щось пішло не так... з координатами ';
                });

                $scope.phone = localStorage.getItem('phone') || '';
                $scope.name = localStorage.getItem('name') || '';
                $scope.place = localStorage.getItem('address') || '';

                function loadOptions() {
                    $scope.selectedItems = shared.getProductsToBuy();
                    $scope.total =  shared.getTotal();
                    $scope.paymentButton = shared.getPaymentButton();
                    $scope.currentOrderUuid = shared.getCurrentOrderUuid();
                    $scope.paymentType = shared.getPaymentType();
                    $scope.deliveryType = shared.getDeliveryType();
                    $scope.wholesaleCount = shared.getWholesaleCount();
                    $scope.totalWholesalePrice = shared.getWholesalePrice();
                }
                loadOptions();

                $http({
                    method: 'GET',
                    url: '/delivery'
                }).then(function successCallback(response) {
                        console.log('from /delivery', response.data);
                        $scope.deliverance = response.data;

                    if($scope.total < $scope.deliverance.courierFreeDeliveryLimit) {
                          $scope.deliveryPrice = $scope.deliverance.courierPrice;
                        }
                    // set delivery price for wholesale order
                    // if ($scope.totalWholesalePrice != 0) {
                    //     if ($scope.totalWholesalePrice < $scope.deliverance.courierFreeDeliveryLimit) {
                    //         $scope.deliveryPrice = $scope.deliverance.courierPrice;
                    //     }
                    // }

                    }, function errorCallback(error) {
                        console.log(error);
                    });

                $http({
                    method: 'GET',
                    url: '/shop/details/public'
                }).then(function successCallback(response) {
                        $scope.isShowAmountTools = response.data.isShowAmountTools;
                        $scope.shopName = response.data.name;
                        $scope.shopId = response.data.uuid;
                        $scope.payLateButton = response.data.manualPaymentEnabled;
                        $scope.onlinePaymentEbabled = response.data.onlinePaymentEnabled;
                        $scope.buttonPaymentTitle = response.data.buttonPaymentTitle;
                        console.log("buttonPaymentTitle", $scope.buttonPaymentTitle);
                        if (!$scope.buttonPaymentTitle){
                            $scope.buttonPaymentTitle = "До оплати";
                        }
                    }, function errorCallback(error) {
                        console.log(error);
                    });

                $scope.makeOrder = function (){
                    $scope.loading = true;

                    $scope.params = {
                        deliveryType: $scope.deliveryType,
                        paymentType: $scope.paymentType,
                        phone: new String(document.getElementById('phone').value),
                        email: document.getElementById('email').value,
                        name: document.getElementById('name').value,
                        address: document.getElementById('address').value,
                        amountTools: document.getElementById('amountTools').value,
                        newPostDepartment: "",
                        selectedItems: $scope.selectedItems,
                        comment: document.getElementById('comment').value,
                        coupon: "",
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
                            $scope.currentOrderUuid = response.data.uuid;
                            if ($scope.paymentType == 'CASHONDELIVERY'){
                              console.log('deliveryType', $scope.deliveryType);
                              console.log('paymentType', $scope.paymentType);
                              cashToCourier();
                            } else if ($scope.paymentType == 'CREDITCARD') {
                              console.log('deliveryType', $scope.deliveryType);
                              console.log('paymentType', $scope.paymentType);
                              payOnline();
                            }

                        }, function errorCallback(data) {
                            $scope.loading = false;
                            console.log(data);
                        });
                };

                function cashToCourier() {
                    $http({
                        method: 'PUT',
                        url: '/order/' + $scope.currentOrderUuid + '/manually-payed'
                    })
                        .then(function successCallback(response) {
                            console.log("order response", response);
                            window.location.pathname = '/done';
                        }, function errorCallback(data) {
                            console.log(data);
                        });
                };

                function payOnline() {
                    console.log("payonline");
                  var rootDiv = document.querySelector('.proceedWithPayment');
                  rootDiv.firstChild.submit();
                };

                $scope.customerData = function () {
                    if (!$scope.place) {
                        return;
                    }
                    localStorage.setItem('name', $scope.name);
                    localStorage.setItem('phone', $scope.phone);
                    if ($scope.place && $scope.place.formatted_address){
                        localStorage.setItem('address', $scope.place.formatted_address);
                        localStorage.setItem('addressLat', $scope.place.geometry.location.lat());
                        localStorage.setItem('addressLng', $scope.place.geometry.location.lng());
                        console.log($scope.place.geometry.location.lat(), $scope.place.geometry.location.lng());

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
