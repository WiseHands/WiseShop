angular.module('WiseHands')
    .controller('SettingsController', function ($scope, $route, $http, signout) {
        $scope.$route = $route;
        $scope.loading = true;
        $scope.hostName = window.location.hostname;


        var token = localStorage.getItem('X-AUTH-TOKEN');
        var userId = localStorage.getItem('X-AUTH-USER-ID');


        $scope.activeShop = {
            domain: '',
            shopName: ''
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
                $scope.loading = false;
                $scope.shops = response.data;

                $scope.shops.forEach(function(shop, key, array) {
                    if (shop.domain === $scope.hostName){
                        shop.startTime = new Date(shop.startTime);
                        shop.endTime = new Date(shop.endTime);
                        $scope.selectedShop = shop;
                    }
                });

            }, function errorCallback(response) {
                if (response.data === 'Invalid X-AUTH-TOKEN') {
                    signout.signOut();
                }
                $scope.loading = false;
                $scope.status = 'Щось пішло не так...';
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
            }, function errorCallback(response) {
                if (response.data === 'Invalid X-AUTH-TOKEN') {
                    signout.signOut();
                }
                $scope.status = 'Щось пішло не так...';
            });

        $scope.shopSelected = function (shop) {
            window.location.href = window.location.protocol + "//"
            						+ $scope.selectedShop.domain + ":" + window.location.port
            						+ "/admin"
            						+ '?X-AUTH-USER-ID=' + userId + "&X-AUTH-TOKEN=" + token +
           						 	+ "#/settings";
        };

        $scope.createNewStore = function () {

            $scope.loading = true;

            var params = {
                name: $scope.newStore.name,
                domain: angular.lowercase($scope.newStore.domain),
                publicLiqpay: $scope.newStore.publicLiqpay,
                privateLiqpay: $scope.newStore.privateLiqpay
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
                .success(function (data, status, headers) {
                    $scope.loading = false;
                    $scope.shops.push(data);
                    window.location.href = window.location.protocol + "//"
                        + $scope.newStore.domain + ":" + window.location.port
                        + "/admin"
                        + '?X-AUTH-USER-ID=' + userId + "&X-AUTH-TOKEN=" + token +
                        + "#/settings";
                }).
            error(function (error) {
                $scope.loading = false;
                $scope.errorMessage = error;
                console.log(error);
            });
        };

        $scope.updateStoreSettings = function () {
            $scope.loading = true;
            $http({
                method: 'PUT',
                url: '/shop',
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                },
                data: $scope.selectedShop
            })
                .success(function (data, status, headers) {
                    $scope.loading = false;
                    document.title = $scope.selectedShop.shopName;
                    $scope.activeShop = $scope.selectedShop;
                }).
            error(function (response) {
                if (response.data === 'Invalid X-AUTH-TOKEN') {
                    signout.signOut();
                }
                $scope.loading = false;
                console.log(response);
            });
        };

        $scope.getUrl = function (shop) {
            return  window.location.protocol + '//' + shop.domain + ':' + window.location.port;
        };
        $scope.signOut = signout.signOut;

        
    });

function encodeQueryData(data)
{
    var ret = [];
    for (var d in data)
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
}