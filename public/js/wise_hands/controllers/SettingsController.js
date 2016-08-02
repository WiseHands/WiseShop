angular.module('WiseHands')
    .controller('SettingsController', function ($scope, $route, $http) {
        $scope.$route = $route;
        $scope.loading = true;
        $scope.hostName = window.location.hostname;
        $http({
            method: 'GET',
            url: '/shops',
            headers: {
                'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
            }
        })
            .then(function successCallback(response) {
                $scope.loading = false;
                $scope.shops = response.data;

                $scope.shops.forEach(function(shop, key, array) {
                    if (shop.domain === $scope.hostName){
                        $scope.selectedShop = shop;
                    }
                });

            }, function errorCallback(data) {
                $scope.loading = false;
                $scope.status = 'Щось пішло не так...';
            });

        $scope.shopSelected = function (shop) {
            window.location.href = window.location.protocol + "//" + $scope.selectedShop.domain + ":" + window.location.port + "/admin#/settings";
        };

        $scope.createNewStore = function () {

            $scope.loading = true;

            var params = {
                name: $scope.newStore.name,
                domain: $scope.newStore.domain,
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
                }).
            error(function (error) {
                $scope.loading = false;
                console.log(error);
            });
        }
    });

function encodeQueryData(data)
{
    var ret = [];
    for (var d in data)
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
}
