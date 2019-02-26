(function(){
    angular.module('WiseHands')
        .controller('DeliveryBounderController', ['$scope', '$http', '$route', '$location', function($scope, $http, $route, $location) {

          $http({
              method: 'GET',
              url: '/shop/details'
          })
              .then(function successCallback(response) {
                  $scope.courierPolygonData = JSON.parse(response.data.delivery.courierPolygonData);
                  console.log("loadPolygons", $scope.courierPolygonData, typeof response, response);
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

                  function init_map(latLng) {
                      if (!latLng) return;
                      var map;
                      var cords = latLng.split(':');
                      var lat = cords[0];
                      var lng = cords[1];
                      var var_location = new google.maps.LatLng(lat, lng);
                      var var_map_options = {
                          center: var_location,
                          zoom: 14
                          };
                      var var_marker = new google.maps.Marker({
                          position: var_location,
                          map: map
                          });
                      // set googleMap By Id
                      map = new google.maps.Map(document.getElementById("googleMap"), var_map_options);
                      var_marker.setMap(map);
                      var selectPolygone = 'Polygon';
                      map.data.setControls([selectPolygone]);
                      map.data.setStyle({
                          editable: true,
                          draggable: true
                      });
                      bindDataLayerListeners(map.data);

                      //load saved data
                      loadPolygons(map);

                  // Apply listeners to refresh the GeoJson display on a given data layer.
                  function bindDataLayerListeners(dataLayer) {
                      dataLayer.addListener('addfeature', savePolygon);
                      dataLayer.addListener('removefeature', savePolygon);
                      dataLayer.addListener('setgeometry', savePolygon);
                  }

                  function loadPolygons(map) {
                      var data = $scope.courierPolygonData;
                      console.log('data to draw a polygon', data);
                      if(isEmpty(data)) {
                        console.log('no data to draw a polygon', data);
                        return;
                      }
                      map.data.addGeoJson(data);
                      // map.data.forEach(function (f) {
                      //     map.data.remove(f);
                      // });
                  }

                  function isEmpty(obj) {
                      for(var key in obj) {
                          if(obj.hasOwnProperty(key))
                              return false;
                      }
                      return true;
                  }

                  function savePolygon() {
                      map.data.toGeoJson(function (json) {
                        var strjson = JSON.stringify(json);
                        var objjson = JSON.parse(strjson);
                        // get the coordinates from GeoJson
                        var objCoordinates = objjson.features[0].geometry.coordinates[0];
                        // var arr = JSON.parse(objjson.features);
                          console.log("objjson-", objjson, typeof objCoordinates, typeof objjson);

                          $http({
                              method: 'POST',
                              url: '/courier/polygon',
                              data: strjson,
                          })
                              .then(function successCallback(response) {
                                console.log("successCallback to save polugone");
                              }, function errorCallback(response) {
                                console.log("errorCallback to save polygone");
                              });
                      });
                  }

                  function deletePolygon () {
                      // map.data.setStyle({visible: false});
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

                }

                   google.maps.event.addDomListener(document.getElementById('delete-button'), 'click', deletePolygon);

                }

        }]);

})();
