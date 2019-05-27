angular.module('WiseHands')
    .controller('SubmitNewShopsController', [
        '$scope', '$location', '$http', 'signout', '$uibModal',
        function ($scope, $location, $http, signout, $uibModal) {

            var fd = new FormData();

            var token = localStorage.getItem('JWT_TOKEN');
            var currentUser = JSON.parse(atob(token.split('.')[1]));
            var userUuid = currentUser.uuid;
            var shopUuid;
            $http({
                method: 'GET',
                url: '/user/' + userUuid,
            }).then(function successCallback(response){
                $scope.shopList = response.data.shopList;
                shopUuid = $scope.shopList[0].uuid;
                console.log("uuid", shopUuid, "response", response);
            }, function errorCallback(data){
            });


            $http({
                method: 'GET',
                url: '/shop/details',
            })
                .then(function successCallback(response) {
                    $scope.activeShop = response.data;
                    console.log("in response $scope.activeShop", $scope.activeShop);
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
                console.log('submitNetworkShops;', $scope.shopList);
                let selectedShopList = [];
                $scope.shopList.forEach(function(shop) {
                    if(shop.selected) {
                        selectedShopList.push(shop.uuid);
                    }
                });

                fd.append('networkName', $scope.shopNetworkName);
                fd.append('shopUuidList', selectedShopList.join());

                $http.post('/shop-network', fd, {
                    transformRequest: angular.identity,
                    headers: {
                       'Content-Type': undefined,
                          }
                    }).success(function(data){
                          $scope.loading = false;
                          // $location.path('/shops');
                          console.log("success send data ",data);
                    }).error(function(response){
                          $scope.loading = false;
                          console.log("error response",response);
                    });
            };

            $http({
                method: 'GET',
                url: '/all-networks',
            })
                .then(function successCallback(response) {

                    console.log("in response list network", response);
                }, function errorCallback(response) {
                });



    }]);
