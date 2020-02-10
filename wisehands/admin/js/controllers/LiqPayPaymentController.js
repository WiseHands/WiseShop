angular.module('WiseHands')
    .controller('LiqPayPaymentController', ['$scope', '$http', 'signout', 'sideNavInit',
        function ($scope, $http, signout, sideNavInit) {
        $scope.loading = true;

        $http({
            method: 'GET',
            url: '/liqpaypayment/detail'
        })
            .then(function successCallback(response) {
                $scope.liqpay = response.data;
                $scope.loading = false;

                console.log("$scope.liqpay successCallback: ", response.data);
            }, function errorCallback(data) {
                console.log("error: ", data);
                showWarningMsg("SOME ERROR");
                $scope.loading = false;

            });


        $scope.setLiqPayPaymentOpts = function () {
            $scope.loading = true;

            console.log("setLiqPAY");
            $http({
                method: 'PUT',
                url: '/liqpaypayment',
                data: $scope.liqpay
            })
                .then(function successCallback(response) {
                    console.log("$scope.liqpay successCallback: ", response.data);
                    showInfoMsg("SAVED");
                    $scope.loading = false;

                }, function errorCallback(response) {
                    console.log("error: ", response)
                    showWarningMsg("SOME ERROR");
                    $scope.loading = false;

                });
        };

        sideNavInit.sideNav();


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
}]);

