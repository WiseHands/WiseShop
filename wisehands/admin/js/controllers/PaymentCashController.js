angular.module('WiseHands')
    .controller('PaymentCashController', ['$scope', '$http', 'signout', 'sideNavInit', '$window',
        function ($scope, $http, signout, sideNavInit, $window) {
            $scope.loading = true;

            $http({
                method: 'GET',
                url: '/payment/detail',
            })
                .then(function successCallback(response) {
                    $scope.payment = response.data;
                    $scope.loading = false;
                }, function errorCallback(data) {
                    console.log(data);
                    $scope.loading = false;
                });

            $scope.redirectToTranslation = () => $window.location.href = `#/translation/cash`;

            $scope.saveCashPaymentOptions = function () {
                $scope.loading = true;
                $http({
                    method: 'PUT',
                    url: '/payment/update/cash/setting',
                    data: $scope.payment,
                })
                    .then(function successCallback(response) {
                        $scope.payment = response.data;
                        $scope.loading = false;
                        showInfoMsg("SAVED");
                    }, function errorCallback(response) {
                        $scope.loading = false;
                        showWarningMsg("ERROR");
                    });
            };
            sideNavInit.sideNav();
        }]);
function showWarningMsg(msg) {
    toastr.clear();
    toastr.options = {
        "positionClass": "toast-bottom-right",
        "preventDuplicates": true
    };
    toastr.warning(msg);
}
function showInfoMsg(msg) {
    toastr.clear();
    toastr.options = {
        "positionClass": "toast-bottom-right",
        "preventDuplicates": true
    };
    toastr.info(msg);
}

