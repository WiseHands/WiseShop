(function(){
    angular.module('WiseHands')
        .controller('DeliveryBounderController', ['$scope', '$http', '$route', '$location', function($scope, $http, $route, $location) {

            $http({
                  method: 'GET',
                  url: '/shop/details'
            })
                .then(function successCallback(response) {
                  $scope.courierPolygonData = JSON.parse(response.data.delivery.courierPolygonData);
                  console.log("loadPolygons", $scope.courierPolygonData, typeof $scope.courierPolygonData);
                }, function errorCallback(data) {
                  $scope.status = 'Щось пішло не так... з координатами ';
                });

            $http({
                method: 'GET',
                url: '/contact/details'
            })
                .then(function successCallback(response) {
                    $scope.contacts = response.data;
                    initMap($scope.contacts.latLng);
                    console.log('shop contacts', $scope.contacts.latLng);
                }, function errorCallback(data) {
                    $scope.status = 'Щось пішло не так...';
                });
            var map;
            function initMap(latLng) {
                if (!latLng) return;

                var cords = latLng.split(',');
                var lat = cords[0];
                var lng = cords[1];
                var var_location = new google.maps.LatLng(lat, lng);
                var var_map_options = {
                    center: var_location,
                    zoom: 10
                };
                var var_marker = new google.maps.Marker({
                    position: var_location,
                    map: map
                });
                // set googleMap By Id
                map = new google.maps.Map(document.getElementById("googleMap"), var_map_options);
                var_marker.setMap(map);
                map.data.setControls(['Polygon']);
                map.data.setStyle({
                    editable: true,
                    draggable: true
                });
                bindDataLayerListeners(map.data);
                //load saved data
                loadPolygons(map, $scope.courierPolygonData);

            }
                // Apply listeners to refresh the GeoJson display on a given data layer.
                function bindDataLayerListeners(dataLayer) {
                    dataLayer.addListener('addfeature', savePolygon);
                    dataLayer.addListener('removefeature', savePolygon);
                    dataLayer.addListener('setgeometry', savePolygon);
                }

                function loadPolygons(map, data) {

                    console.log('data to draw a polygon', data);
                    if (isEmpty(data)) {
                        console.log('no data to draw a polygon', data);
                        return;
                    }
                    map.data.forEach(function (f) {
                        map.data.remove(f);
                    });
                    map.data.addGeoJson(data);

                }

                function isEmpty(obj) {
                    for (var key in obj) {
                        if (obj.hasOwnProperty(key))
                            return false;
                    }
                    return true;
                }

                function savePolygon() {
                    map.data.toGeoJson(function (json) {
                        console.log("localStorage.setItem", JSON.stringify(json));
                        var objjson = JSON.parse(JSON.stringify(json));
                        // get the coordinates from GeoJson

                        $http({
                            method: 'POST',
                            url: '/courier/polygon',
                            data: objjson,
                        })
                            .then(function successCallback(response) {
                                console.log("successCallback to save polugone");
                            }, function errorCallback(response) {
                                console.log("errorCallback to save polygone");
                            });
                    });
                }

                document.getElementById('deleteBtn').onclick = function () {

                    map.data.forEach(function (f) {
                        map.data.remove(f);
                    });

                    var strjson = '{}';
                    var objjson = JSON.parse(strjson);
                    console.log("objjson-", objjson, typeof objjson);
                    $http({
                        method: 'DELETE',
                        url: '/courier/polygon',
                        data: objjson,
                    })
                        .then(function successCallback(response) {
                            console.log("successCallback to save empty polugone");
                        }, function errorCallback(response) {
                            console.log("errorCallback to save empty polygone");
                        });

                };


        }]);

})();
