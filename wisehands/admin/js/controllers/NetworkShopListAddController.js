angular.module('WiseHands')
    .controller('NetworkShopListAddController', ['$scope', '$http', '$routeParams', '$location', 'sideNavInit', function ($scope, $http, $routeParams, $location, sideNavInit) {
        $scope.uuid = $routeParams.uuid;

        $scope.loading = true;

        sideNavInit.sideNav();

        $scope.isShopInNetwork = false;
        $http({
            method: 'GET',
            url: '/api/available-shops',
        }).then(function successCallback(response){
            $scope.networkShopsList = response.data;
            if ($scope.networkShopsList.length == 0){
                $scope.isShopInNetwork = true;
            }
            console.log("shop isn't in network ", $scope.uuid, $scope.networkShopsList.length);
        }, function errorCallback(data){
        });

        // get api key for google maps
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

        $scope.addShopToNetwork = function () {

            let selectedShopList = [];
            $scope.networkShopsList.forEach(function(shop) {
                if(shop.selected) {
                    selectedShopList.push(shop.uuid);
                }
            });
            console.log("selected shop", selectedShopList);


            var url = '/api/network/add-shop';
            var fd = new FormData();

            fd.append('networkUuid', $scope.uuid);
            fd.append('shopUuidList', selectedShopList.join());
            $http.put(url, fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined,
                }
            }).success(function(data){
                console.log('add-shop /network/shop', data);
                $location.path('/network');
                $scope.loading = false;
            }).error(function(response){
                $scope.loading = false;
                console.log("error response", response);
            });
        }


    }]);
