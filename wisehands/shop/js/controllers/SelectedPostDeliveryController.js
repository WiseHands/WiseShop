(function(){
    angular.module('WiseShop')
        .controller('SelectedPostDeliveryController', ['$scope', '$http', 'shared',
            function($scope, $http, shared) {


                var paymentButton = document.querySelector(".proceedWithPayment");
                paymentButton.innerHTML = $scope.paymentButton;

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
                }
                loadOptions();

                $http({
                    method: 'GET',
                    url: '/delivery'
                }).then(function successCallback(response) {
                        $scope.deliverance = response.data;
                        $scope.minOrderForFreeDelivery = $scope.deliverance.courierFreeDeliveryLimit;

                    }, function errorCallback(error) {
                        console.log(error);
                    });

                $http({
                    method: 'GET',
                    url: '/shop/details/public'
                }).then(function successCallback(response) {
                        $scope.shopName = response.data.name;
                        $scope.shopId = response.data.uuid;
                        $scope.payLateButton = response.data.manualPaymentEnabled;
                        $scope.onlinePaymentEbabled = response.data.onlinePaymentEnabled;
                        $scope.buttonPaymentTitle = response.data.buttonPaymentTitle;
                        console.log("buttonPaymentTitle", $scope.buttonPaymentTitle);
                        if ($scope.buttonPaymentTitle === ""){
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
                        name: document.getElementById('name').value,
                        email: document.getElementById('email').value,
                        address: "",
                        newPostDepartment: document.getElementById('newPostDepartment').value,
                        selectedItems: $scope.selectedItems,
                        comment: document.getElementById('comment').value,
                        coupon: "",
                        addressLat: localStorage.getItem('addressLat'),
                        addressLng: localStorage.getItem('addressLng')
                    };
                    var encodedParams = encodeQueryData($scope.params);
                    console.log("$scope.params before http", $scope.params);
                    $http({
                        method: 'POST',
                        url: '/order',
                        data: $scope.params
                    }).then(function successCallback(response) {
                        console.log("$scope.params response http", response.data);

                        // $scope.loading = false;
                        //     $scope.successfullResponse = true;
                        //     var modalContent = document.querySelector(".proceedWithPayment");
                        //     modalContent.innerHTML = response.data.button;
                        //     $scope.currentOrderUuid = response.data.uuid;
                        //     if ($scope.paymentType == 'CASHONSPOT'){
                        //       cashToCourier();
                        //     } else if ($scope.paymentType == 'PAYONLINE') {
                        //       payOnline();
                        //     }

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
                            window.location.pathname = '/done';
                        }, function errorCallback(data) {
                            console.log(data);
                        });
                };

                function payOnline() {
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
