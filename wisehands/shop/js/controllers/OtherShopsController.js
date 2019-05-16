(function(){
    angular.module('WiseShop')
        .controller('OtherShopsController', ['$scope', '$http', 'shared', '$route', 'sideNavInit', 'PublicShopInfo', 'isUserAdmin', '$location',
            function($scope, $http, shared, $route, sideNavInit, PublicShopInfo, isUserAdmin, $location) {

              $scope.loading = true;
              var map, marker;

              $http({
                method: 'GET',
                url: '/department'
              })
                .then(function successCallback(response){
                  $scope.departments = response.data;
                  var department = response.data[0];
                  console.log("in response", $scope.departments, department.destinationLat, department.destinationLng);
                  // init_map(department.destinationLat, department.destinationLng);
                }, function errorCallback(data){
              });

              $http({
                method: 'GET',
                url: '/shop/details'
              })
                .then(function successCallback(response){
                  $scope.activeShop = response.data;
                  console.log("shopdetail", response)
                }, function errorCallback(data){
              });

              function init_map(lat, lng) {
                var var_location = new google.maps.LatLng(lat, lng);
                var var_map_options = {
                  center: var_location,
                  zoom: 15,
                };
                map = new google.maps.Map(document.getElementById("idForMap"), var_map_options);

                marker = new google.maps.Marker({
                  position: var_location,
                  map: map,

                });

              }


        }]);
})();
