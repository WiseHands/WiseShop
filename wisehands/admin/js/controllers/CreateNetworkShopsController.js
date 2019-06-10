angular.module('WiseHands')
    .controller('CreateNetworkShopsController', [
        '$scope', '$location', '$http',
        function ($scope, $location, $http) {

            $http({
                method: 'GET',
                url: '/available-shops',
            }).then(function successCallback(response){
                $scope.shopList = response.data;
                console.log("shops for networks", $scope.shopList);
            }, function errorCallback(data){
            });


            $http({
                method: 'GET',
                url: '/shop/details',
            })
                .then(function successCallback(response) {
                    $scope.activeShop = response.data;
                    console.log("$scope.activeShop", $scope.activeShop);
                }, function errorCallback(response) {
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

            $scope.submitNetworkShops = function () {

                let selectedShopList = [];
                $scope.shopList.forEach(function(shop) {
                    if(shop.selected) {
                        selectedShopList.push(shop.uuid);
                    }
                });
                console.log('submitNetworkShops;', selectedShopList);

                let fd = new FormData();
                fd.append('networkName', $scope.shopNetworkName);
                fd.append('shopUuidList', selectedShopList.join());

                $http.post('/shop-network', fd, {
                    transformRequest: angular.identity,
                    headers: {
                       'Content-Type': undefined,
                          }
                    }).success(function(data){
                          $scope.loading = false;
                          $location.path('/network');
                          console.log('shopUuidList', data);
                    }).error(function(response){
                          $scope.loading = false;
                          console.log("error response",response);
                    });



            };





    }]);
