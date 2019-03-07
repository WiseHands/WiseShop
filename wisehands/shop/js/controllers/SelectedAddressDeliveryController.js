// selectedcourierdelivery
(function() {
  angular.module('WiseShop')
    .controller('SelectedAddressDeliveryController', ['$scope', '$http', '$route', 'shared', '$route', '$location',
      function($scope, $http, shared, $route, $location) {

        $scope.buttonDisabled = true;

        $http({
          method: 'GET',
          url: '/courier/polygon'
        }).then(function successCallback(response) {
          $scope.courierPolygonData = JSON.parse(response.data);
          console.log('/courier/polygon', $scope.courierPolygonData);
          $scope._arrayCoordinates = $scope.courierPolygonData.features[0].geometry.coordinates[0];
          if (!$scope.mapInitialized && $scope.contacts) {
            init_map($scope.contacts.latLng);
          }
        }, function errorCallback(data) {
          $scope.status = 'Щось пішло не так... з координатами ';
        });




        $http({
          method: 'GET',
          url: '/contact/details'
        }).then(function successCallback(response) {
          $scope.contacts = response.data;
          console.log('/contact/details', $scope.contacts);
          if (!$scope.mapInitialized && $scope._arrayCoordinates) {
            init_map($scope.contacts.latLng);
          }
        }, function errorCallback(data) {
          $scope.status = 'Щось пішло не так...';
        });



        var map, marker, polygon;

        function init_map(latLng) {
          if (!latLng) return;

          var cords = latLng.split(':');
          var lat = cords[0];
          var lng = cords[1];
          var var_location = new google.maps.LatLng(lat, lng);

          var var_map_options = {
            center: var_location,
            zoom: 17
          };
          map = new google.maps.Map(document.getElementById("googleMap"), var_map_options);

          google.maps.event.addListener(map, 'click', function(event) {
            $scope.buttonDisabled = true;
            showWarningMsg('Please click inside delivery zone');
          });

          setDeliveryBoundariesPolygonOnMap();
          $scope.mapInitialized = true;
        }



        function setDeliveryBoundariesPolygonOnMap() {
          let polygonData = [];
          for (var i = 0; i < $scope._arrayCoordinates.length; i++) {
            let _item = $scope._arrayCoordinates[i];
            polygonData.push({
              lat: _item[1],
              lng: _item[0]
            });
          };
          console.log('polygonData', polygonData);

          var polygonOptions = {
            paths: polygonData,
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
          let bounds = new google.maps.LatLngBounds();
          for (var i = 0; i < polygonData.length; i++) {
            bounds.extend(polygonData[i]);
          }
          let centerLocation = new google.maps.LatLng(bounds.getCenter().lat(), bounds.getCenter().lng());
          map.setCenter(centerLocation);
          map.setZoom(17);

          google.maps.event.addListener(polygon, 'click', function(event) {
            let latlng = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
            localStorage.setItem('addressLat', latlng.lat());
            localStorage.setItem('addressLng', latlng.lng());
            console.log('polygon, click You are in range of delivery');
            geocodeLatLng(latlng, true);
          });
        }

        function geocodeLatLng(latlng, isLocationInsidePolygon) {
          let geocoder = new google.maps.Geocoder();
          geocoder.geocode({
            'location': latlng
          }, function(results, status) {
            if (status === 'OK') {
              if (results[0]) {
                console.log('geocoding result: ', results);

                map.setZoom(17);
                let address = results[0].formatted_address;
                localStorage.setItem('address', address);
                $scope.$apply(function() {
                  $scope.buttonDisabled = !isLocationInsidePolygon;
                });
                showInfoMsg(address);

                console.log('geocoding result: ', address, latlng.lat(), latlng.lng());

                if (marker) marker.setMap(null);
                if (!isLocationInsidePolygon) {
                  map.setCenter(latlng);
                  showWarningMsg('Address out of delivery range');
                } else {
                  marker = new google.maps.Marker({
                    position: latlng,
                    map: map,
                  });
                  map.setCenter(latlng);
                }

              } else {
                console.log('no address');
              }
            } else {
              console.log('finded address ', status);
            }
          });
        }


        $scope.goToRoute = function() {
          if ($scope.buttonDisabled) {
            showWarningMsg('Address not selected');
            return;
          }
          location.hash ='#!/paymentnewstage';
        }

        $scope.myLocation = function() {
          if (navigator.geolocation) {

            showInfoMsg('Geolocating...');
            navigator.geolocation.getCurrentPosition(function(position) {
              let latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
              let isLocationInsidePolygon = google.maps.geometry.poly.containsLocation(latlng, polygon);
              console.log('navigator.geolocation latLng:', latlng, ' isLocationInsidePolygon: ', isLocationInsidePolygon);

              localStorage.setItem('addressLat', latlng.lat());
              localStorage.setItem('addressLng', latlng.lng());
              geocodeLatLng(latlng, isLocationInsidePolygon);
            }, function() {
              showWarningMsg('Geolocation not available')
            });

          } else {
            showWarningMsg('Geolocation not available')
          }
        }


      }
    ]);
})();

function showWarningMsg(msg) {
  toastr.clear();
  toastr.options = {
    "positionClass": "toast-bottom-center",
    "preventDuplicates": true,
  }
  toastr.warning(msg);
}

function showInfoMsg(msg) {
  toastr.clear();
  toastr.options = {
    "positionClass": "toast-bottom-center",
    "preventDuplicates": true,
  }
  toastr.info(msg);
}

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

function encodeQueryData(data) {
  var ret = [];
  for (var d in data)
    ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
  return ret.join("&");
}
