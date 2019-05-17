angular.module('WiseHands')
    .controller('SubmitNewShopsController', [
        '$scope', '$location', '$http', 'signout', '$uibModal',
        function ($scope, $location, $http, signout, $uibModal) {

          var fd = new FormData();

          $scope.submitShops = function () {
              $scope.loading = true;
              let coord = $scope.shop.coords;
              let coords = coord.split(',');
              let destinationLat = coords[0];
              let destinationLng = coords[1];
              fd.append('shopName', $scope.shop.shopName);
              fd.append('shopAddress', $scope.shop.shopAddress);
              fd.append('shopMail', $scope.shop.shopGmail);
              fd.append('shopPhone', $scope.shop.shopPhoneAdmin);
              fd.append('destinationLat', destinationLat);
              fd.append('destinationLng', destinationLng);

              $http.post('/department', fd, {
                      transformRequest: angular.identity,
                      headers: {
                          'Content-Type': undefined,
                      }
                  })
                  .success(function(data){
                      $scope.loading = false;
                      $location.path('/shops');
                      console.log("send data ",data);

                  })
                  .error(function(response){
                      $scope.loading = false;
                      console.log("response",response);
                  });
          };


    }]);
