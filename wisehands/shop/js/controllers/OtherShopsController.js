(function(){
    angular.module('WiseShop')
        .controller('OtherShopsController', ['$scope', '$http', 'shared', '$route', 'sideNavInit', 'PublicShopInfo', 'isUserAdmin', '$location',
            function($scope, $http, shared, $route, sideNavInit, PublicShopInfo, isUserAdmin, $location) {

              $scope.loading = true;



              $http({
                method: 'GET',
                url: '/shop-network'
              })
                .then(function successCallback(response){
                  $scope.departments = response.data.shopList;
                  // var department = response.data[0];
                  console.log("in response", $scope.departments);
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

              $scope.getLat = function (shop) {
                    var cords = shop.contact.latLng.split(',');
                    let lat = cords[0];
                    return lat;
              };

              $scope.getLng = function (shop) {
                    var cords = shop.contact.latLng.split(',');
                    let lng = cords[1];
                    return lng;
              };

        }]);
})();
