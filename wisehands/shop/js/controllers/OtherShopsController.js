(function(){
    angular.module('WiseShop')
        .controller('OtherShopsController', ['$scope', '$http', 'sideNavInit',
            function($scope, $http, sideNavInit) {

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
                        console.log($scope.shopList);
                        if ($scope.shopList == null){
                            $scope.isCoords = true;
                            $scope.isMap = false;
                        } else {
                            $scope.isCoords = false;
                            $scope.isMap = true;
                        }

                        $scope.loading = false;
                }, function errorCallback(data){
                        $scope.loading = false;

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



                $scope.findNearStore = function () {
                    $scope.loading = true;

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
                            var distanceTo = [];
                            var distanceToShops = [];
                            var origin = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                            geocodeOriginPosition(origin);

                            for (var i=0; i<shopLatCoords.length; i++){
                                for(var j=0; j<shopLngCoords.length; j++){
                                    var destination = new google.maps.LatLng(shopLatCoords[i], shopLngCoords[j]);
                                    var distance = google.maps.geometry.spherical.computeDistanceBetween(origin, destination);
                                }
                                //
                                distanceToShops.push(Math.round(distance, 1));
                            }
                            //
                            for (var i=0; i<distanceToShops.length; i++){
                                $scope.shopList[i].distanceToShop = distanceToShops[i];
                            }

                            var sortedShopList = $scope.shopList.sort(function(a,b){
                                return a.distanceToShop - b.distanceToShop;
                            });

                            $scope.$apply(function(){
                                $scope.m = 'm';
                                $scope.shopList = sortedShopList;
                                $scope.loading = false;
                            });

                            console.log("put sorting distanceToShops in shopList", $scope.shopList);


                        }, function() {
                            $scope.$apply(function(){
                                $scope.loading = false;
                            });
                            showWarningMsg('Geolocation not available')
                        });

                    } else {
                        $scope.$apply(function(){
                            $scope.loading = false;
                        });
                        showWarningMsg('Geolocation not available')
                    }


                };

                function geocodeOriginPosition(latlng) {
                    $scope.loading = false;
                    let geocoder = new google.maps.Geocoder();
                    geocoder.geocode({
                        'location': latlng
                    }, function(results, status) {
                        if (status === 'OK') {
                            if (results[0]) {
                                console.log('geocoding result: ', results);

                                let newAdd = [];
                                for (var i = 0; i<=3; i++){
                                    let address = results[0].address_components[i];
                                    newAdd.push(address.long_name);

                                }
                                let address = newAdd.reverse(newAdd).join(', ');
                                showInfoMsg(address);
                                $scope.loading = false;
                            } else {
                                console.log('no address');
                                $scope.loading = false;
                            }
                        } else {
                            console.log('finded address ', status);
                            $scope.loading = false;
                        }
                    });
                };

                sideNavInit.sideNav();

            }]);
})();
