angular.module('WiseHands')
    .controller('LiqPayPaymentController', ['$scope', '$http', 'signout', 'sideNavInit', 'shared',
        function ($scope, $http, signout, sideNavInit, shared) {
        $scope.loading = true;

        $http({
            method: 'GET',
            url: '/liqpaypayment/detail'
        })
            .then(function successCallback(response) {
                $scope.liqpay = response.data;
                console.log("$scope.liqpay successCallback: ", response.data);
            }, function errorCallback(data) {
                console.log("error: ", data);
                showWarningMsg("SOME ERROR");
            });




        $scope.setLiqPayPaymentOpts = function () {
            $http({
                method: 'PUT',
                url: '/liqpaypayment',
                data: $scope.liqpay
            })
                .then(function successCallback(response) {
                    $scope.liqpay = response.data;
                    console.log("$scope.liqpay successCallback: ", response.data);
                    showInfoMsg("SAVED");
                }, function errorCallback(response) {
                    console.log("error: ", response)
                    showWarningMsg("SOME ERROR");
                });
        };

        sideNavInit.sideNav();
    }]);
function showWarningMsg(msg) {
    toastr.clear();
    toastr.options = {
        "positionClass": "toast-bottom-center",
        "preventDuplicates": true
    };
    toastr.warning(msg);
}

function showInfoMsg(msg) {
    toastr.clear();
    toastr.options = {
        "positionClass": "toast-bottom-center",
        "preventDuplicates": true
    };
    toastr.info(msg);
}

