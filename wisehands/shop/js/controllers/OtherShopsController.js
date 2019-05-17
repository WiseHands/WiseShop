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
                }, function errorCallback(data){
              });

              $http({
                method: 'GET',
                url: '/shop/details/public'
              })
                .then(function successCallback(response){
                    $scope.activeShop = response.data;
                  console.log("shop/details/public:googleStaticMapsApiKey", response.data.googleStaticMapsApiKey)
                }, function errorCallback(data){
              });

        }]);
})();
