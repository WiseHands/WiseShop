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
            }, function errorCallback(data) {
                $scope.loading = false;
                $scope.status = 'Щось пішло не так...';
            });

        $scope.createNewStore = function () {

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
                    $scope.shops.push(data);
                    console.log(data);
                }).
            error(function (error) {
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
