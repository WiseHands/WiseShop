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
                // headers: {
                //     'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                //     'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                // }
            })
                .then(function successCallback(response) {
                    $scope.loading = false;
                    $scope.userInfo = response.data;
                }, function errorCallback(data) {
                    $scope.loading = false;
                    // signout.signOut();
                });

            $scope.updateUserInfo = function () {
                $scope.loading = true;
                $http({
                    method: 'PUT',
                    url: '/profile',
                    data: $scope.userInfo,
                    // headers: {
                    //     'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    //     'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                    // }
                })
                    .then(function successCallback(response) {
                        $scope.loading = false;
                        $scope.userInfo = response.data;
                    }, function errorCallback(data) {
                        $scope.loading = false;
                        // signout.signOut();
                    });
            };

            $http({
                method: 'GET',
                url: '/shops',
                // headers: {
                //     'X-AUTH-TOKEN': token,
                //     'X-AUTH-USER-ID': userId
                // }
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
                    // if (response.data === 'Invalid X-AUTH-TOKEN') {
                    //     signout.signOut();
                    // }
                    $scope.loading = false;
                });

            $http({
                method: 'GET',
                url: '/shop/details',
                // headers: {
                //     'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                //     'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                // }
            })
                .then(function successCallback(response) {
                    $scope.activeShop = response.data;
                    $scope.requestQueue -= 1;
                    if ($scope.requestQueue === 0) {
                        $scope.loading = false;
                    }
                }, function errorCallback(response) {
                    // if (response.data === 'Invalid X-AUTH-TOKEN') {
                    //     signout.signOut();
                    // }
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
                let _domain = $scope.newStore.domain;
                let _isLocalhostEnv = document.domain.indexOf('localhost') !== -1;
                if(_isLocalhostEnv) {
                    _domain += '.localhost';
                } else {
                    _domain += '.wisehands.me'
                }

                $scope.loading = true;
				var domain = document.domain;
                var params = {
                    name: $scope.newStore.name,
                    domain: _domain
                };

                var encodedParams = encodeQueryData(params);

                $http({
                    method: 'POST',
                    url: '/shop?' + encodedParams,
                    // headers: {
                    //     'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    //     'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                    // }
                })
                    .success(function (data) {
                        setTimeout(function() {
                           $scope.loading = false;
                           $scope.shops.push(data);
                           window.location.href = window.location.protocol + "//"
                                + data.domain + ":" + window.location.port
                                + "/admin"
                                + '?X-AUTH-USER-ID=' + userId + "&X-AUTH-TOKEN=" + token;
                        }, 10000);
                    }).
                error(function (error) {
                    $scope.loading = false;
                    $scope.errorMessage = error;
                });
            };

            sideNavInit.sideNav();
        }]);
