angular.module('WiseHands')
    .controller('NetworkController', ['$scope', '$http', 'sideNavInit', 'signout', function ($scope, $http, sideNavInit, signout) {
        $scope.loading = true;

        sideNavInit.sideNav();

        $scope.getNetworks = function () {
            $http({
                method: 'GET',
                url: '/all-networks'
            })
                .then(function successCallback(response){
                    $scope.networkList = response.data;

                    console.log("in response", $scope.networkList);
                    console.log("get latLng from shopList", response.data[0].shopList[0].contact.latLng);

                    var _markers = ''
                    var cords = [];
                    for (var network = 0; network < $scope.networkList.length; network++){
                        for (var shop = 0; shop < $scope.networkList[network].shopList.length; shop++){
                            var latLng = $scope.networkList[network].shopList[shop].contact.latLng;
                            cords.push(latLng);
                            _markers += '&markers=color:red%7Clabel:S%7C' + latLng;
                        }
                    }
                    console.log(cords);
                    getCenterPosition(cords);
                    console.log("midde", getCenterPosition(cords));

                    $scope.staticMapUrl = 'https://maps.googleapis.com/maps/api/staticmap' +
                        '?center=' + $scope.centerLatitude + ',' +  $scope.centerLongitude +
                        '&zoom=' + $scope.zoomLevel +
                        '&size=600x300' +
                        '&maptype=roadmap';
                    $scope.staticMapUrl = $scope.staticMapUrl + _markers;
                    $scope.staticMapUrl = $scope.staticMapUrl + '&key=' + $scope.activeShop.googleStaticMapsApiKey;
                    console.log($scope.staticMapUrl, _markers);

                }, function errorCallback(data){
                });
        };



        $http({
            method: 'GET',
            url: '/shop/details/public'
        })
            .then(function successCallback(response){
                $scope.activeShop = response.data;
                $scope.getNetworks();
                // console.log("shop/details/public:googleStaticMapsApiKey", response.data.googleStaticMapsApiKey)
            }, function errorCallback(data){
            });


            $scope.Lat = 49.8459250;
                // function (shop) {
            //     var cords = shop.shopList.contact.latLng.split(',');
            //     let lng = cords[1];
            //     return lng;
            // };
            //
            $scope.Lng = 49.8459250;
                // function (shop) {
            //     var cords = shop.shopList.contact.latLng.split(',');
            //     let lng = cords[1];
            //     return lng;
            // };

        function getCenterPosition(cords){
            var latitudearray = [];
            var longitudearray = [];

            for(var i=0; i<cords.length;i++){
                var coordinates = cords[i].split(",");
                latitudearray.push(coordinates[0]);
                longitudearray.push(coordinates[1]);
            }
            console.log("latitudearray",latitudearray);
            console.log("longitudearray",longitudearray);
            latitudearray.sort(function (a, b) { return a-b; });
            longitudearray.sort(function (a, b) { return a-b; });
            var latdifferenece = latitudearray[latitudearray.length-1] - latitudearray[0];
            var temp = (latdifferenece / 2).toFixed(4) ;
            var latitudeMid = (parseFloat(latitudearray[0]) + parseFloat(temp)).toFixed(7);
            var longidifferenece = longitudearray[longitudearray.length-1] - longitudearray[0];
            temp = (longidifferenece / 2).toFixed(4) ;
            var longitudeMid = (parseFloat(longitudearray[0]) + parseFloat(temp)).toFixed(7);
            var maxdifference = (latdifferenece > longidifferenece)? latdifferenece : longidifferenece;
            var zoomvalue;
            if(maxdifference >= 0 && maxdifference <= 0.0037)  //zoom 17
                zoomvalue='17';
            else if(maxdifference > 0.0037 && maxdifference <= 0.0070)  //zoom 16
                zoomvalue='16';
            else if(maxdifference > 0.0070 && maxdifference <= 0.0130)  //zoom 15
                zoomvalue='15';
            else if(maxdifference > 0.0130 && maxdifference <= 0.0290)  //zoom 14
                zoomvalue='14';
            else if(maxdifference > 0.0290 && maxdifference <= 0.0550)  //zoom 13
                zoomvalue='13';
            else if(maxdifference > 0.0550 && maxdifference <= 0.1200)  //zoom 12
                zoomvalue='12';
            else if(maxdifference > 0.1200 && maxdifference <= 0.4640)  //zoom 10
                zoomvalue='10';
            else if(maxdifference > 0.4640 && maxdifference <= 1.8580)  //zoom 8
                zoomvalue='8';
            else if(maxdifference > 1.8580 && maxdifference <= 3.5310)  //zoom 7
                zoomvalue='7';
            else if(maxdifference > 3.5310 && maxdifference <= 7.3367)  //zoom 6
                zoomvalue='6';
            else if(maxdifference > 7.3367 && maxdifference <= 14.222)  //zoom 5
                zoomvalue='5';
            else if(maxdifference > 14.222 && maxdifference <= 28.000)  //zoom 4
                zoomvalue='4';
            else if(maxdifference > 28.000 && maxdifference <= 58.000)  //zoom 3
                zoomvalue='3';
            else
                zoomvalue='1';
            $scope.centerLatitude = latitudeMid;
            $scope.centerLongitude = longitudeMid;
            $scope.zoomLevel = zoomvalue;
            return latitudeMid+'|'+longitudeMid+'|'+zoomvalue;
        }

    }]);
