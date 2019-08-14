angular.module('WiseHands')
    .controller('PaymentController', ['$scope', '$http', 'signout', 'sideNavInit', 'shared',
        function ($scope, $http, signout, sideNavInit, shared) {
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
                // signout.signOut();
            });

            $http({
                method: 'GET',
                url: '/coupons',
            })
                .then(function successCallback(response) {
                    $scope.coupons = response.data;
                    $scope.loading = false;
                }, function errorCallback(response) {
                    $scope.loading = false;
                    console.log(response);
                });


        $scope.setPaymentOptions = function () {
            $scope.loading = true;
            $http({
                method: 'PUT',
                url: '/payment/update',
                data: $scope.payment,
            })
                .then(function successCallback(response) {
                    $scope.payment = response.data;
                    $scope.loading = false;
                    console.log("$scope.payment " + JSON.stringify($scope.payment));

                }, function errorCallback(response) {
                    $scope.loading = false;
                    console.log(response);
                });

        };
        $scope.createCoupons = function () {
            $scope.loading = true;
            $scope.couponRows.push($scope.plans);
            var coupons = {
                plans: $scope.couponRows,
                coupons: $scope.couponsIds
            };
            $http({
                method: 'POST',
                url: '/coupons',
                data: coupons,
            })
                .then(function successCallback(response) {
                    $scope.coupons = response.data;
                    $scope.result = {};
                    $scope.couponRows = [];
                    $scope.couponsIds = [];
                    $scope.plans = {};
                    $scope.loading = false;
                }, function errorCallback(response) {
                    $scope.loading = false;
                    console.log(response);
                });

        };
        $scope.setDiscountCard = function (coupon) {
            shared.setDiscountCards(coupon);
        };
        $scope.couponRows = [];
        $scope.createNewCouponRow = function () {
            $scope.couponRows.push({});
        };
        sideNavInit.sideNav();
    }]);


