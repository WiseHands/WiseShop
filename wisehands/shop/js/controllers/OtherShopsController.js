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

                // function getLatitudeFromContact(){
                //
                //     return lat;
                // };

                $scope.findNearStore = function () {
                    console.log("find shop");

                    if (navigator.geolocation) {

                        var shopCoords = [];
                        for (var i=0; i < $scope.shopList.length; i++){
                            shopCoords.push($scope.shopList[i].contact.latLng);
                        }
                        let testShopCoords = shopCoords[0].split(',');
                        let shopLat = testShopCoords[0];
                        let shopLng = testShopCoords[1];
                        navigator.geolocation.getCurrentPosition(function(position) {
                            let latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                            let ltlg = new google.maps.LatLng(shopLat, shopLng);
                            var distance = google.maps.geometry.spherical.computeDistanceBetween(latlng, ltlg);

                            showInfoMsg('sorting... ' + distance);
                        }, function() {
                            showWarningMsg('Geolocation not available')
                        });

                    } else {
                        showWarningMsg('Geolocation not available')
                    }

                }
        }]);
})();
