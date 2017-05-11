angular.module('WiseHands')
    .controller('UserProfileController', ['$scope', '$http', 'signout', 'sideNavInit',
        function ($scope, $http, signout, sideNavInit) {
            $scope.loading = true;


            var token = localStorage.getItem('X-AUTH-TOKEN');
            var userId = localStorage.getItem('X-AUTH-USER-ID');
            $scope.hostName = window.location.hostname;


            $http({
                method: 'GET',
                url: '/profile',
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                }
            })
                .then(function successCallback(response) {
                    $scope.loading = false;
                    $scope.userInfo = response.data;
                }, function errorCallback(data) {
                    $scope.loading = false;
                    signout.signOut();
                });

            $scope.updateUserInfo = function () {
                $scope.loading = true;
                $http({
                    method: 'PUT',
                    url: '/profile',
                    data: $scope.userInfo,
                    headers: {
                        'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                        'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                    }
                })
                    .then(function successCallback(response) {
                        $scope.loading = false;
                        $scope.userInfo = response.data;
                    }, function errorCallback(data) {
                        $scope.loading = false;
                        signout.signOut();
                    });
            };

            $http({
                method: 'GET',
                url: '/shops',
                headers: {
                    'X-AUTH-TOKEN': token,
                    'X-AUTH-USER-ID': userId
                }
            })
                .then(function successCallback(response) {
                    $scope.shops = response.data;
                    $scope.shops.forEach(function (shop, key, array) {
                        if (shop.domain === $scope.hostName) {
                            shop.startTime = new Date(shop.startTime);
                            shop.endTime = new Date(shop.endTime);
                            $scope.selectedShop = shop;
                        }
                    });
                    $scope.loading = false;
                }, function errorCallback(response) {
                    if (response.data === 'Invalid X-AUTH-TOKEN') {
                        signout.signOut();
                    }
                    $scope.loading = false;
                });

            $http({
                method: 'GET',
                url: '/shop/details',
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                }
            })
                .then(function successCallback(response) {
                    $scope.activeShop = response.data;
                    $scope.requestQueue -= 1;
                    if ($scope.requestQueue === 0) {
                        $scope.loading = false;
                    }
                }, function errorCallback(response) {
                    if (response.data === 'Invalid X-AUTH-TOKEN') {
                        signout.signOut();
                    }
                    $scope.requestQueue -= 1;
                    if ($scope.requestQueue === 0) {
                        $scope.loading = false;
                    }
                });

            $scope.shopSelected = function (shop) {
                window.location.href = window.location.protocol + "//"
                    + $scope.selectedShop.domain + ":" + window.location.port
                    + "/admin"
                    + '?X-AUTH-USER-ID=' + userId + "&X-AUTH-TOKEN=" + token;
            };


            $scope.createNewStore = function () {

                $scope.loading = true;
                var isDevEnv = document.domain.indexOf('localhost') != -1;
                if (isDevEnv){
                    var domain = 'localhost';
                } else {
                    domain = 'wisehands.me';
                }
                var params = {
                    name: $scope.newStore.name,
                    domain:$scope.newStore.domain + '.' + domain
                };

                var encodedParams = encodeQueryData(params);

                $http({
                    method: 'POST',
                    url: '/shop?' + encodedParams,
                    headers: {
                        'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                        'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                    }
                })
                    .success(function (data) {
                        $scope.loading = false;
                        $scope.shops.push(data);
                        window.location.href = window.location.protocol + "//"
                            + data.domain + ":" + window.location.port
                            + "/admin"
                            + '?X-AUTH-USER-ID=' + userId + "&X-AUTH-TOKEN=" + token;
                    }).
                error(function (error) {
                    $scope.loading = false;
                    $scope.errorMessage = error;
                });
            };
            // $scope.dateFormat = function (balanceDetail) {
            //     var date = new Date(balanceDetail.date);
            //     var ddyymm = new Date(balanceDetail.date).toISOString().slice(0,10);
            //     var hour = (date.getHours()<10?'0':'') + date.getHours();
            //     var minute = (date.getMinutes()<10?'0':'') + date.getMinutes();
            //     return ddyymm + ' ' + hour + ':' + minute;
            // };
            // $scope.paymentState = function(balanceDetail){
            //     if (balanceDetail.amount > 0){
            //         return 'teal';
            //     } else {
            //         return '#03a9f4';
            //     }
            // };
            // $scope.isTransactionPayed = function (balanceDetail) {
            //     if (balanceDetail.state === 'PAYED') {
            //         return true;
            //     }
            //
            // }
            sideNavInit.sideNav();
        }]);
