angular.module('WiseHands')
  .controller('CourierDeliverySettingsController', ['$scope', '$http', '$location', 'sideNavInit', function ($scope, $http, $location, sideNavInit) {
    $scope.loading = true;

    $http({
      method: 'GET',
      url: '/delivery',

    })
      .then(response => {
          $scope.loading = false;
          $scope.delivery = response.data;
        }, () => $scope.loading = false
      );


    $scope.setDeliveryOptions = () => {
      $scope.loading = true;
      $http({
        method: 'PUT',
        url: '/delivery',
        data: $scope.delivery,

      })
        .then(() => {
          $scope.loading = false;
          $location.path('/delivery');
          showInfoMessage("SAVED");
        }, error => {
          $scope.loading = false;
          console.log(error);
          showInfoMessage("ERROR");
        });

    };

    sideNavInit.sideNav();
    //google map init//

    $http({
      method: 'GET',
      url: '/shop/details'
    })
      .then(response => {
          if (response.data.delivery.courierPolygonData) $scope.courierPolygonData = JSON.parse(response.data.delivery.courierPolygonData);
          _getContactDetails();
        }, error => console.log(error)
      );

    function _getContactDetails() {
      $http({
        method: 'GET',
        url: '/contact/details'
      })
        .then(response => {
            const contacts = response.data;
            if (contacts.latLng) _initMap(contacts.latLng);
          }, error => console.log(error)
        );
    }

    function _initMap(latLng) {
      const googleMapContainer = document.getElementById('googleMap');
      const cords = latLng.split(',');
      const lat = cords[0];
      const lng = cords[1];
      const var_location = new google.maps.LatLng(lat, lng);
      $scope.var_map_options = {
        streetViewControl: false,
        center: var_location,
        zoom: 10
      };
      $scope.map = new google.maps.Map(googleMapContainer, $scope.var_map_options);
      const var_marker = new google.maps.Marker({
        position: var_location,
        map: $scope.map
      });
      var_marker.setMap($scope.map);
      if (Object.keys($scope.courierPolygonData).length) $scope.map.data.addGeoJson($scope.courierPolygonData);
    }

    function showInfoMessage(msg) {
      toastr.clear();
      toastr.options = {
        "positionClass": "toast-bottom-right",
        "preventDuplicates": true
      };
      toastr.info(msg);
    }
  }]);
