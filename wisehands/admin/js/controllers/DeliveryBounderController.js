angular.module('WiseHands')
  .controller('DeliveryBounderController', ['$scope', '$http', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/shop/details'
    })
      .then(response => {
        if (response.data.delivery.courierPolygonData) $scope.courierPolygonData = JSON.parse(response.data.delivery.courierPolygonData);
      }, error => {
        $scope.status = 'Щось пішло не так з координатами.';
        console.log(error);
      });

    $http({
      method: 'GET',
      url: '/contact/details'
    })
      .then(response => {
        const contacts = response.data;
        if (contacts.latLng) _initMap(contacts.latLng);
      }, error => {
        $scope.status = 'Щось пішло не так...';
        console.log(error);
      });

    function _initMap(latLng) {
      const cords = latLng.split(',');
      const lat = cords[0];
      const lng = cords[1];
      const var_location = new google.maps.LatLng(lat, lng);
      $scope.var_map_options = {
        streetViewControl: false,
        center: var_location,
        zoom: 10
      };
      $scope.map = new google.maps.Map(document.getElementById('googleMap'), $scope.var_map_options);
      const var_marker = new google.maps.Marker({
        position: var_location,
        map: $scope.map
      });
      var_marker.setMap($scope.map);
      $scope.map.data.setControls(['Polygon']);
      $scope.map.data.setStyle({
        editable: true,
        draggable: true
      });

      _bindDataLayerListeners($scope.map.data);
      const deleteAreaButton = _createDeleteDeliveryBoundariesButton($scope.map);
      $scope.map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(deleteAreaButton);
      _loadPolygon($scope.map, $scope.courierPolygonData);
    }

    function _bindDataLayerListeners(dataLayer) {
      dataLayer.addListener('addfeature', _disablePolygonEditing);
      dataLayer.addListener('removefeature', _enablePolygonEditing);
    }

    function _loadPolygon(map, data) {
      if (data.length) map.data.addGeoJson(data);
    }

    function _disablePolygonEditing() {
      $scope.map.data.setControls(null);
      $scope.map.data.setDrawingMode(null);
    }

    function _enablePolygonEditing() {
      $scope.map.data.setControls(['Polygon']);
    }

    $scope._saveDeliveryBoundaries = () => {
      $scope.map.data.toGeoJson(json => {
        const objjson = JSON.parse(JSON.stringify(json));
        const isPolygonPresentOnMap = !!objjson.features.length;
        isPolygonPresentOnMap ? _savePolygon(objjson) : _deletePolygon();
      });
    };

    function _savePolygon(polygon) {
      $http({
        method: 'POST',
        url: '/courier/polygon',
        data: polygon,
      }).then(_showSaveToaster(),
        error => {
          $scope.status = 'Щось пішло не так...';
          console.log(error);
        });
    }

    function _deletePolygon() {
      $http({
        method: 'DELETE',
        url: '/courier/polygon',
        data: {}
      }).then(_showSaveToaster(),
        error => {
          $scope.status = 'Щось пішло не так...';
          console.log(error);
        });
    }

    function _showSaveToaster() {
      toastr.clear();
      toastr.options = {
        'positionClass': 'toast-bottom-right',
        'preventDuplicates': true,
      };
      toastr.info('Saved successfully');
    }

    function _createDeleteDeliveryBoundariesButton(map) {
      const deleteAreaButton = document.createElement('div');
      deleteAreaButton.classList.add('delete-area-button');
      deleteAreaButton.index = 1;
      deleteAreaButton.title = 'Click to delete the area';
      const deleteAreaButtonText = document.createElement('span');
      deleteAreaButtonText.innerText = 'Delete area';
      deleteAreaButton.appendChild(deleteAreaButtonText);
      deleteAreaButton.addEventListener('click', () => {
        map.data.forEach(property => {
          map.data.remove(property);
        });
      });
      return deleteAreaButton;
    }
  }]);
