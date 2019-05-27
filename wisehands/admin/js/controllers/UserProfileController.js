angular.module('WiseHands')
    .controller('UserProfileController', ['$scope', '$http', 'signout', 'sideNavInit',
        function ($scope, $http, signout, sideNavInit) {
            $scope.loading = true;


            var token = localStorage.getItem('JWT_TOKEN');
            $scope.hostName = window.location.hostname;


            $http({
                method: 'GET',
                url: '/profile',
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
                    $scope.loading = false;
                });

            $http({
                method: 'GET',
                url: '/shop/details',
            })
                .then(function successCallback(response) {
                    $scope.activeShop = response.data;
                    $scope.requestQueue -= 1;
                    if ($scope.requestQueue === 0) {
                        $scope.loading = false;
                    }
                }, function errorCallback(response) {
                    $scope.requestQueue -= 1;
                    if ($scope.requestQueue === 0) {
                        $scope.loading = false;
                    }
                });

            $scope.shopSelected = function (shop) {
                window.location.href = window.location.protocol + "//"
                    + $scope.selectedShop.domain + ":" + window.location.port
                    + "/admin"
                    + '?JWT_TOKEN=' + token;
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
                })
                    .success(function (data) {
                        setTimeout(function() {
                           $scope.loading = false;
                           $scope.shops.push(data);
                           window.location.href = window.location.protocol + "//"
                                + data.domain + ":" + window.location.port
                                + "/admin"
                                + '?JWT_TOKEN=' + token;
                        }, 10000);
                    }).
                error(function (error) {
                    $scope.loading = false;
                    $scope.errorMessage = error;
                });
            };

            $http({
                method: 'GET',
                url: '/shop-network'
            })
                .then(function successCallback(response){
                    $scope.networkName = response.data.networkName;
                    $scope.departments = response.data.shopList;
                    // var department = response.data[0];
                    console.log("in response", response);
                }, function errorCallback(data){
                });


            $http({
                method: 'GET',
                url: '/shop/details/public'
            })
                .then(function successCallback(response){
                    $scope.activeShop = response.data;
                    console.log("shop/details/public:googleStaticMapsApiKey", response.data.googleStaticMapsApiKey)
                }, function errorCallback(data){
                });

            $scope.getLat = function (shop) {
                var cords = shop.contact.latLng.split(',');
                let lat = cords[0];
                return lat;
            };

            $scope.getLng = function (shop) {
                var cords = shop.contact.latLng.split(',');
                let lng = cords[1];
                return lng;
            };


            sideNavInit.sideNav();
        }]);
