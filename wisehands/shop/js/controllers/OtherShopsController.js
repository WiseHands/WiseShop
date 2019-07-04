(function(){
    angular.module('WiseShop')
        .controller('OtherShopsController', ['$scope', '$http',
            function($scope, $http) {

                $scope.loading = true;
                $scope.openShop = function (shop) {
                    let _url = location.protocol
                        + '//' + shop.domain
                        + ':' + location.port
                        + "/#selectedShop=true";
                    console.log("openShop", _url, shop);
                    location = _url;
                };

                $http({
                    method: 'GET',
                    url: '/network'
                })
                    .then(function successCallback(response){
                        $scope.shopList = response.data.shopList;

                        console.log("in response all-networks", $scope.shopList);
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

                $scope.findNearStore = function () {
                    console.log("find shop");

                    if (navigator.geolocation) {

                        var shopCoords = [];
                        var shopLatCoords = [];
                        var shopLngCoords = [];
                        for (var i=0; i < $scope.shopList.length; i++){
                            shopCoords.push($scope.shopList[i].contact.latLng);
                            let testShopCoords = shopCoords[i].split(',');
                            shopLatCoords.push(testShopCoords[0]);
                            shopLngCoords.push(testShopCoords[1]);
                        }

                        console.log("shopCoords testShopCoords ", shopCoords)
                        console.log("shopLatCoords ", shopLatCoords);
                        console.log("shopLngCoords ", shopLngCoords);


                        navigator.geolocation.getCurrentPosition(function(position) {

                            var distanceToShops = [];
                            var origin = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                            for (var i=0; i<shopLatCoords.length; i++){
                                for(var j=0; j<shopLngCoords.length; j++){
                                    var destination = new google.maps.LatLng(shopLatCoords[i], shopLngCoords[j]);
                                }
                                var distance = google.maps.geometry.spherical.computeDistanceBetween(origin, destination);
                                distanceToShops.push(Math.round(distance, 1));
                            }

                            for (var i=0; i<distanceToShops.length; i++){
                                $scope.shopList[i].distanceToShop = distanceToShops[i];
                            }

                            var sortedShopList = $scope.shopList.sort(function(a,b){
                                return a.distanceToShop - b.distanceToShop;
                            });

                            $scope.$apply(function(){
                                $scope.m = 'm';
                                $scope.shopList = sortedShopList;
                            });

                            console.log("put sorting distanceToShops in shopList", $scope.shopList);


                        }, function() {
                            showWarningMsg('Geolocation not available')
                        });

                    } else {
                        showWarningMsg('Geolocation not available')
                    }

                }
        }]);
})();
