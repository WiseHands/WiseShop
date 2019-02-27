(function(){
    angular.module('WiseShop')
        .controller('SelectedCourierDeliveryController', ['$scope', '$http', 'shared',
            function($scope, $http, shared) {
                $scope.phone = localStorage.getItem('phone') || '';
                $scope.name = localStorage.getItem('name') || '';
                $scope.place = localStorage.getItem('address') || '';

                function loadOptions() {
                    $scope.selectedItems = shared.getProductsToBuy();
                    $scope.total =  shared.getTotal();
                }
                loadOptions();

                $http({
                    method: 'GET',
                    url: '/delivery'
                }).then(function successCallback(response) {
                        $scope.deliverance = response.data;
                        if($scope.total < $scope.deliverance.courierFreeDeliveryLimit) {
                          $scope.deliveryPrice = $scope.deliverance.courierPrice;
                        }

                    }, function errorCallback(error) {
                        console.log(error);
                    });

                $http({
                    method: 'GET',
                    url: '/shop/details/public'
                }).then(function successCallback(response) {
                        $scope.shopName = response.data.name;
                        $scope.shopId = response.data.uuid;
                    }, function errorCallback(error) {
                        console.log(error);
                    });

                $scope.makeOrder = function (){
                    $scope.loading = true;
                    var deliveryType = 'COURIER';

                    $scope.params = {
                        deliveryType: deliveryType,
                        phone: new String(document.getElementById('phone').value),
                        name: document.getElementById('name').value,
                        address: document.getElementById('address').value,
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
                            shared.setPaymentButton(modalContent.innerHTML);
                            $scope.currentOrderUuid = response.data.uuid;
                            shared.setCurrentOrderUuid($scope.currentOrderUuid);
                            window.location.hash ='#!/paymentstage';
                        }, function errorCallback(data) {
                            $scope.loading = false;
                            console.log(data);
                        });
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
