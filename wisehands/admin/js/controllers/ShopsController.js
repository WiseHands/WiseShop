angular.module('WiseHands')
    .controller('ShopsController', ['$scope', '$http', 'sideNavInit', 'signout', function ($scope, $http, sideNavInit, signout) {
        $scope.loading = true;

        sideNavInit.sideNav();

        $http({
            method: 'GET',
            url: '/all-networks'
        })
            .then(function successCallback(response){
                $scope.network = response.data;

                console.log("in response", $scope.network);
                console.log("get latLng from shopList", response.data[0].shopList[0].contact.latLng);
                var cords = [];
                for (var network = 0; network < $scope.network.length; network++){
                    for (var shop = 0; shop < $scope.network[network].shopList.length; shop++){
                        cords.push($scope.network[network].shopList[shop].contact.latLng);
                    }
                }
                console.log(cords);
            }, function errorCallback(data){
            });


        $http({
            method: 'GET',
            url: '/shop/details/public'
        })
            .then(function successCallback(response){
                $scope.activeShop = response.data;
                // console.log("shop/details/public:googleStaticMapsApiKey", response.data.googleStaticMapsApiKey)
            }, function errorCallback(data){
            });

        $scope.getLat = function () {
            for (var network = 0; network < $scope.network.length; network++){
                for (var shop = 0; shop < $scope.network[network].length; shop++){
                    var cords = $scope.network[network].shopList[shop].contact.latLng.split(',');
                    let lat = cords[0];
                    console.log(lat);
                    return lat;

                }

            }


        };
        //
        // $scope.getLng = function (shop) {
        //     var cords = shop.shopList.contact.latLng.split(',');
        //     let lng = cords[1];
        //     return lng;
        // };

    }]);
