angular.module('WiseHands')
    .controller('PaymentController', ['$scope', '$http', 'signout', 'sideNavInit', 'shared',
        function ($scope, $http, signout, sideNavInit, shared) {

        $http({
            method: 'GET',
            url: '/payment/detail',
        })
            .then(function successCallback(response) {
                $scope.payment = response.data;
                $scope.loading = false;
                console.log("$scope.payment", $scope.payment);
            }, function errorCallback(data) {
                console.log(data);
                $scope.loading = false;
            });

        $scope.setMinimalPaymentToOrder = function () {
            $scope.loading = true;
            $http({
                method: 'PUT',
                url: '/payment/minimal',
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


