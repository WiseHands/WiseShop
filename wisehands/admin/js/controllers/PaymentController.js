angular.module('WiseHands')
    .controller('PaymentController', ['$scope', '$http', 'signout', 'sideNavInit', 'shared', function ($scope, $http, signout, sideNavInit, shared) {
        $scope.loading = true;

        $http({
            method: 'GET',
            url: '/payment/detail',
            headers: {
                'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
            }
        })
            .then(function successCallback(response) {
                $scope.payment = response.data;
                $scope.loading = false;
            }, function errorCallback(data) {
                console.log(data);
                $scope.loading = false;
                signout.signOut();
            });

            $http({
                method: 'GET',
                url: '/coupons',
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                }
            })
                .then(function successCallback(response) {
                    $scope.coupons = response.data;
                    $scope.loading = false;
                }, function errorCallback(response) {
                    if (response.data === 'Invalid X-AUTH-TOKEN') {
                        signout.signOut();
                    }
                    $scope.loading = false;
                    console.log(response);
                });


        $scope.setPaymentOptions = function () {
            $scope.loading = true;
            $http({
                method: 'PUT',
                url: '/payment/update',
                data: $scope.payment,
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                }
            })
                .then(function successCallback(response) {
                    $scope.payment = response.data;
                    $scope.loading = false;
                }, function errorCallback(response) {
                    if (response.data === 'Invalid X-AUTH-TOKEN') {
                        signout.signOut();
                    }
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
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                }
            })
                .then(function successCallback(response) {
                    $scope.coupons = response.data;
                    $scope.result = {};
                    $scope.couponRows = [];
                    $scope.couponsIds = [];
                    $scope.plans = {};
                    $scope.loading = false;
                }, function errorCallback(response) {
                    if (response.data === 'Invalid X-AUTH-TOKEN') {
                        signout.signOut();
                    }
                    $scope.loading = false;
                    console.log(response);
                });

        };
        $scope.setDiscountCard = function (coupon) {
            shared.setDiscountCards(coupon);
        };

        $scope.deleteMessage = 'Ви дійсно хочете видалити всі купони?';
        $scope.deleteButton = true;
        $scope.hideModal3 = function () {
            $('#deleteAllCoupons').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        };
        $scope.deleteAllCoupons = function () {
            $scope.deleteButton = false;
            $scope.loading = true;
            $http({
                method: 'DELETE',
                url: '/coupons',
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                }
            })
                .then(function successCallback(response) {
                    $scope.coupons = [];
                    $scope.result = {};
                    $scope.loading = false;
                    $scope.succesfullDelete = true;
                    $scope.deleteMessage = 'Купони видалені.';

                }, function errorCallback(response) {
                    if (response.data === 'Invalid X-AUTH-TOKEN') {
                        signout.signOut();
                    }
                    $scope.modalSpinner = false;
                    console.log(response);
                });

        };
        $scope.couponRows = [];
        $scope.createNewCouponRow = function () {
            $scope.couponRows.push({});
        };
        sideNavInit.sideNav();
    }]);


