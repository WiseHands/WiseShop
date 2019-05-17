angular.module('WiseHands')
    .controller('ShopsDetailsEditController', [
        '$scope', '$location', '$http', '$routeParams', 'signout', '$uibModal',
        function ($scope, $location, $http, $routeParams, signout, $uibModal) {
              $scope.uuid = $routeParams.uuid;
              console.log("send $scope.uuid ", $scope.uuid);

              $http({
                  method: 'GET',
                  url: '/department/' + $routeParams.uuid
              })
                  .then(function successCallback(response) {
                      $scope.shop = response.data;
                      console.log("$scope.shop", $scope.shop);
                      let lat = $scope.shop.destinationLat;
                      let lng = $scope.shop.destinationLng;
                      $scope.shop.coords = lat + "," + lng;
                  }, function errorCallback(error) {
                      console.log(error);
                  });


              var fd = new FormData();
              $scope.submitUpdateShops = function () {
              $scope.loading = true;
              let coord = $scope.shop.coords;
              let coords = coord.split(',');
              let destinationLat = coords[0];
              let destinationLng = coords[1];
              fd.append('uuid', $scope.uuid);
              fd.append('shopName', $scope.shop.shopName);
              fd.append('shopAddress', $scope.shop.shopAddress);
              fd.append('shopMail', $scope.shop.shopMail);
              fd.append('shopPhone', $scope.shop.shopPhone);
              fd.append('destinationLat', destinationLat);
              fd.append('destinationLng', destinationLng);

              $http.put('/department', fd, {
                      transformRequest: angular.identity,
                      headers: {
                          'Content-Type': undefined,
                      }
                  })
                  .success(function(data){
                      $scope.loading = false;
                      $location.path('/shops/details/' + $scope.uuid);
                      console.log("send data ",data);

                  })
                  .error(function(response){
                      $scope.loading = false;
                      console.log("response",response);
                  });
          };


    }]);
