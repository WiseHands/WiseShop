(function(){
    angular.module('WiseHands')
        .controller('DeliveryBounderController', ['$scope', '$http', '$route', '$location', function($scope, $http, $route, $location) {

            $http({
                  method: 'GET',
                  url: '/shop/details'
            })
                .then(function successCallback(response) {
                  if(!response.data.delivery.courierPolygonData) return;

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
                    streetViewControl: false,
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

                var centerControlDiv = document.createElement('div');
                var centerControl = new deleteDeliveryBoundaries(centerControlDiv, map);

                centerControlDiv.index = 1;
                map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);

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

            $scope.saveDeliveryBoundaries = function () {
                toastr.clear();
                toastr.options = {
                    "positionClass": "toast-bottom-right",
                    "preventDuplicates": true,
                }
                toastr.info("Saved successfully");
            }


            function deleteDeliveryBoundaries(controlDiv, map) {

                // Set CSS for the control border.
                var controlUI = document.createElement('div');
                controlUI.style.backgroundColor = '#fff';
                controlUI.style.border = '2px solid #fff';
                controlUI.style.borderRadius = '6px';
                controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
                controlUI.style.cursor = 'pointer';
                controlUI.style.marginBottom = '17px';
                controlUI.style.textAlign = 'center';
                controlUI.title = 'Click to delete the area';
                controlDiv.appendChild(controlUI);

                // Set CSS for the control interior.
                var controlText = document.createElement('div');
                controlText.style.color = 'rgb(25,25,25)';
                controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
                controlText.style.fontSize = '16px';
                controlText.style.lineHeight = '20px';
                controlText.style.paddingLeft = '5px';
                controlText.style.paddingRight = '5px';
                controlText.innerHTML = 'Delete area';
                controlUI.appendChild(controlText);

                // Setup the click event listeners: simply set the map to Chicago.
                controlUI.addEventListener('click', function() {
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
                });

            }


        }]);

})();
