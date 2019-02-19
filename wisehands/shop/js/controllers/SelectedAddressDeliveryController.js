// selectedcourierdelivery
(function(){
    angular.module('WiseShop')
        .controller('SelectedAddressDeliveryController', ['$scope', '$http', 'shared', '$location',
            function($scope, $http, shared, $location) {

               $scope.place = localStorage.getItem('address') || '';

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
                  location.hash = '#!/selectedcourierdelivery'
                }

                $http({
                    method: 'GET',
                    url: '/shop/details'
                })
                    .then(function successCallback(response) {
                        $scope.courierPolygonData = JSON.parse(response.data.delivery.courierPolygonData);
                        console.log("loadPolygons", $scope.courierPolygonData);
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
                      var geocoder;
                      function init_map(latLng) {
                          geocoder = new google.maps.Geocoder();
                          if (!latLng) return;
                          var map;
                          var marker;
                          var cords = latLng.split(':');
                          var lat = cords[0];
                          var lng = cords[1];
                          var var_location = new google.maps.LatLng(lat, lng);

                          var var_marker = new google.maps.Marker({
                              position: var_location,
                              map: map
                              });

                          var var_map_options = {
                              center: var_location,
                              zoom: 14,
                              // disableDoubleClickZoom: true
                              };
                          // set googleMap By Id
                          map = new google.maps.Map(document.getElementById("googleMap"), var_map_options);
                          var_marker.setMap(map);

                          google.maps.event.addListener(map,'click',function(event) {
                            if (marker && marker.setMap) {
                                  marker.setMap(null);
                              }
                                marker = new google.maps.Marker({
                                  position: event.latLng,
                                  map: map,
                                  title: event.latLng.lat()+', '+event.latLng.lng()
                                });
                            });


                          //load saved data
                          loadPolygons(map);
                          new WOW().init();

                        // Apply listeners to refresh the GeoJson display on a given data layer.

                        function loadPolygons(map) {
                            var data = $scope.courierPolygonData;
                            console.log('data to draw a polygon', data);

                            if(isEmpty(data)) {
                              console.log('no data to draw a polygon', data);
                              return;
                            }

                            map.data.forEach(function (f) {
                                map.data.remove(f);
                            });
                            map.data.addGeoJson(data);
                        }

                          $scope.codeAddress = function() {
                          var address = document.getElementById('address').value;
                          console.log(address);
                          geocoder.geocode( { 'address': address}, function(results, status) {
                            if (status == 'OK') {
                              map.setCenter(results[0].geometry.location);
                              var marker = new google.maps.Marker({
                                  map: map,
                                  position: results[0].geometry.location
                              });
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
