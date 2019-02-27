// selectedcourierdelivery
(function(){
    angular.module('WiseShop')
        .controller('SelectedAddressDeliveryController', ['$scope', '$http', '$route', 'shared', '$route', '$location',
            function($scope, $http, shared, $route, $location) {


               $http({
                   method: 'GET',
                   url: '/delivery'
               }).then(function successCallback(response) {
                       $scope.deliverance = response.data;
                       $scope.minOrderForFreeDelivery = $scope.deliverance.courierFreeDeliveryLimit;

                   }, function errorCallback(error) {
                       console.log(error);
                   });


               $scope.customerData = function () {
                   if (!$scope.place) {
                       return;
                   }
                   if ($scope.place && $scope.place.formatted_address){
                       localStorage.setItem('address', $scope.place.formatted_address);
                       localStorage.setItem('addressLat', $scope.place.geometry.location.lat());
                       localStorage.setItem('addressLng', $scope.place.geometry.location.lng());
                   }
                   if (!$scope.place.formatted_address) {
                       localStorage.setItem('addressLat', '');
                       localStorage.setItem('addressLng', '');
                   }

               };

                $scope.goToRoute = function() {
                  if($scope.buttonDisabled) {
                    console.log('address not selected...');
                    toastr.options = {
                      "positionClass": "toast-bottom-center",
                      "preventDuplicates": true,
                    }
                    toastr.warning('Address not selected');
                    return;
                  }
                  location.hash = '#!/selectedcourierdelivery'
                }

                $http({
                    method: 'GET',
                    url: '/courier/polygon'
                })
                    .then(function successCallback(response) {
                        $scope.courierPolygonData = JSON.parse(response.data);
                        // var data = $scope.courierPolygonData;
                        arrayCoordinates = $scope.courierPolygonData.features[0].geometry.coordinates[0];
                        console.log("loadPolygons response", response, typeof arrayCoordinates, arrayCoordinates);
                    }, function errorCallback(data) {
                        $scope.status = 'Щось пішло не так... з координатами ';
                    });

                  $http({
                      method: 'GET',
                      url: '/contact/details'
                  })
                      .then(function successCallback(response) {
                          $scope.contacts = response.data;
                          init_map($scope.contacts.latLng);
                          console.log($scope.contacts.latLng);
                      }, function errorCallback(data) {
                          $scope.status = 'Щось пішло не так...';
                      });

                      var map;
                      var marker;
                      var latlng;
                      var polygon;
                      var geocoder;
                      var infoWindow;
                      // var isAddress;
                      $scope.buttonDisabled = true;
                      var arrayCoordinates;
                      function init_map(latLng) {
                          geocoder = new google.maps.Geocoder();
                          if (!latLng) return;

                          var cords = latLng.split(':');
                          var lat = cords[0];
                          var lng = cords[1];
                          var var_location = new google.maps.LatLng(lat, lng);

                          var var_map_options = {
                              center: var_location,
                              zoom: 17
                              };
                          // set googleMap By Id
                          infoWindow = new google.maps.InfoWindow;
                          map = new google.maps.Map(document.getElementById("googleMap"), var_map_options);

                          google.maps.event.addListener(map, 'click', function(event) {
                            $scope.buttonDisabled = true;
                            var isAddress = google.maps.geometry.poly.containsLocation(event.latLng, polygon);
                            latlng = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
                            geocodeLatLng(latlng, isAddress);
                            console.log('You aren*t in range of delivery', isAddress);
                            });

                        polygonMap();

                        $scope.myLocation = function(){
                          if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(function(position) {
                              latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                              isAddress = google.maps.geometry.poly.containsLocation(latlng, polygon);
                              console.log('of delivery', latlng, isAddress);
                              geocodeLatLng(latlng, isAddress)
                            }, function() {
                              handleLocationError(true, infoWindow, map.getCenter());
                            });
                          } else {
                            // Browser doesn't support Geolocation
                            handleLocationError(false, infoWindow, map.getCenter());
                          }
                        }
                      }

                      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
                              infoWindow.setPosition(pos);
                              infoWindow.setContent(browserHasGeolocation ?
                                                    'Error: The Geolocation service failed.' :
                                                    'Error: Your browser doesn\'t support geolocation.');
                              infoWindow.open(map);
                            }

                      function polygonMap(){
                          var objectCoordinates = [];
                          for (var i = 0; i < arrayCoordinates.length; i++) {
                            objectCoordinates.push({
                              lat: arrayCoordinates[i][1],
                              lng: arrayCoordinates[i][0]
                            });
                          };
                          console.log('objectArray', objectCoordinates);


                            var polygonOptions = {
                                paths: objectCoordinates,
                                clickable: true,
                                visible: true,
                                strokeColor: '#FF0000',
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                fillColor: '#99ff66',
                                fillOpacity: 0.35
                              };
                          polygon = new google.maps.Polygon(polygonOptions);
                          polygon.setMap(map);
                          var bounds = new google.maps.LatLngBounds();
                              for (var i = 0; i < objectCoordinates.length; i++) {
                                bounds.extend(objectCoordinates[i]);
                              }
                            var centerLocation = new google.maps.LatLng(bounds.getCenter().lat(), bounds.getCenter().lng());
                                marker = new google.maps.Marker({
                                      position: centerLocation,
                                      map: map,
                                      visible: false
                                    });
                                map.setCenter(centerLocation);
                                map.setZoom(17);

                            console.log(' bounds.getCenter()', bounds.getCenter().lat(), typeof cords);

                          google.maps.event.addListener(polygon, 'click', function(event) {
                                $scope.buttonDisabled = false;
                                latlng = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
                                console.log('You are in range of delivery');
                                geocodeLatLng(latlng);
                              });

                        }

                      function geocodeLatLng(latlng, isAddress) {
                          geocoder.geocode({'location': latlng}, function(results, status) {
                                  if (status === 'OK') {
                                    if (results[0]) {
                                      map.setZoom(17);
                                      $scope.$apply(function () {
                                        $scope.place = results[0].formatted_address;
                                        localStorage.setItem('address', $scope.place);
                                        $scope.buttonDisabled = false;
                                      });
                                      console.log('address', results[0].formatted_address);
                                        if (isAddress == false) {
                                          if( marker ) marker.setMap( null );
                                            marker = new google.maps.Marker({
                                              position: latlng,
                                              map: map,
                                              visible: false
                                            });
                                         map.setCenter(latlng);
                                         $scope.buttonDisabled = true; // set the disable of button
                                      } else {
                                        if( marker ) marker.setMap( null );
                                          marker = new google.maps.Marker({
                                            position: latlng,
                                            map: map,
                                          });
                                        map.setCenter(latlng);
                                        $scope.buttonDisabled = false; // set the disable of button
                                    }

                              } else {
                                console.log('no address');
                              }
                            } else {
                              console.log('finded address ', status);
                            }
                          });
                        }

                          $scope.codeAddress = function() {
                          var address = document.getElementById('address').value;
                          console.log(address);
                          geocoder.geocode( { 'address': address}, function(results, status) {
                            if (status == 'OK') {
                              map.setCenter(results[0].geometry.location);
                              if (marker && marker.setMap) {
                                    marker.setMap(null);
                                }
                                  marker = new google.maps.Marker({
                                  map: map,
                                  position: results[0].geometry.location
                              });
                              var isAddress = google.maps.geometry.poly.containsLocation(results[0].geometry.location, polygon);
                              if (isAddress) {
                                console.log('You are in range of delivery');
                              } else {
                                console.log('You aren*t in range of delivery');
                              }
                            } else {
                              alert('Geocode was not successful for the following reason: ' + status);
                            }
                          });
                        }

                        function isEmpty(obj) {
                            for(var key in obj) {
                                if(obj.hasOwnProperty(key))
                                    return false;
                            }
                            return true;
                        }

            }]);
})();
function encodeQueryData(data)
{
    var ret = [];
    for (var d in data)
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
}
