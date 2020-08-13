angular.module('WiseHands')
  .controller('ShopLocationController', ['$scope', '$http', function ($scope, $http) {

    $scope.goBack = () => {
      window.history.back();
    };


    $http({
      method: 'GET',
      url: '/contact/details'
    })
      .then(response => {
      $scope.contacts = response.data;
      console.log("/contact/details", $scope.contacts);
      initMap(response.data.shopLocation);
    }, error => {
      $scope.status = 'Щось пішло не так...';
      console.log(error);
    });

    initMap = (shopCoordinates) => {
      let marker, latitude, longitude;
      let isPresentShopCoordinates
      if(shopCoordinates === undefined){
        isPresentShopCoordinates = false;
      } else {
        isPresentShopCoordinates = true;
        latitude = Number(shopCoordinates.latitude);
        longitude = Number(shopCoordinates.longitude);
      }

      let shopLocation = new google.maps.LatLng(latitude, longitude);
      let mapOptions = {
         streetViewControl: false,
         center: shopLocation,
         zoom: 17
      };
      let map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
      if (!isPresentShopCoordinates){
        marker = new google.maps.Marker();
      } else {
        marker = new google.maps.Marker({position: shopLocation, map: map});
      }
      map.addListener('click', function(event) {
        $scope.pointLocation = event.latLng
        if (marker) marker.setMap(null);
        marker = new google.maps.Marker(
          { position: $scope.pointLocation,
             map: map }
          );
      });
    }

    $scope.saveShopLocation = () => {
      console.log('pointLocation from map', $scope.pointLocation.lat(), $scope.pointLocation.lng());
      objectBody = {
        shopLocation: {
          latitude: $scope.pointLocation.lat(),
          longitude: $scope.pointLocation.lng()
        }
      };
      console.log('objectBody for update contacts', objectBody);
      _saveNewAddress(objectBody);
    };

    _saveNewAddress = (objectBody) => {
      $http({
        method: 'PUT',
        url: '/contact',
        data: objectBody,
      }).then(_showSaveToaster(),
        error => {
          $scope.status = 'Щось пішло не так...';
          console.log(error);
        });
    }

    _showSaveToaster = () => {
      toastr.clear();
      toastr.options = {
        'positionClass': 'toast-bottom-right',
        'preventDuplicates': true,
      };
      toastr.info('Saved successfully');
    }


  }]);
