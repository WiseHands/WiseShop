angular.module('WiseHands')
    .controller('NetworkShopListDeleteController', ['$scope', '$http', '$routeParams', '$location','sideNavInit', function ($scope, $http, $routeParams, $location,sideNavInit) {
        $scope.uuid = $routeParams.uuid;

        $scope.loading = true;

        sideNavInit.sideNav();
        $http({
            method: 'GET',
            url: '/api/shop-network/' + $scope.uuid
        })
            .then(function successCallback(response){
                $scope.networkShopsList = response.data.shopList;
                $scope.uuid = response.data.uuid;
                console.log("in response shops for delete", response.data.shopList);
            }, function errorCallback(data){
        });


        $http({
            method: 'GET',
            url: '/shop/details/public'
        })
            .then(function successCallback(response){
                $scope.activeShop = response.data;

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

        $scope.deleteShopsFromNetwork = function () {

            let selectedShopList = [];
            $scope.networkShopsList.forEach(function(shop) {
                if(shop.selected) {
                    selectedShopList.push(shop.uuid);
                }
            });
            console.log("unselected shop", selectedShopList);

            var url = '/api/network/delete-shop' +
                '?networkUuid=' + $scope.uuid +
                '&shopUuidList=' + selectedShopList.join();
            console.log('url', url);

            var fd = new FormData();
            $http.delete(url, fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined,
                }
            }).success(function(data){
                console.log('delete /network/shop', data);
                $location.path('/network');
                $scope.loading = false;
            }).error(function(response){
                $scope.loading = false;
                console.log("error response", response);
            });

        }


    }]);
