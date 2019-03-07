(function(){
    angular.module('WiseShop')
        .controller('PaymentStageController', ['$scope', '$http', 'shared',
            function($scope, $http, shared) {


                function loadOptions() {
                    $scope.paymentButton = shared.getPaymentButton();
                    $scope.currentOrderUuid = shared.getCurrentOrderUuid();
                }
                loadOptions();
                var paymentButton = document.querySelector(".proceedWithPayment");
                paymentButton.innerHTML = $scope.paymentButton;
                $http({
                    method: 'GET',
                    url: '/shop/details/public'
                })
                    .then(function successCallback(response) {
                        $scope.shopName = response.data.name;
                        $scope.shopId = response.data.uuid;
                        $scope.payLateButton = response.data.manualPaymentEnabled;
                        $scope.onlinePaymentEbabled = response.data.onlinePaymentEnabled;
                    }, function errorCallback(error) {
                        console.log(error);
                    });

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
                };
            }]);
})();
