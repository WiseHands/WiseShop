(function(){
    angular.module('WiseShop')
        .controller('OtherShopsController', ['$scope', '$http',
            function($scope, $http) {

              $scope.loading = true;



              $http({
                method: 'GET',
                url: '/network'
              })
                .then(function successCallback(response){
                  $scope.shopList = response.data.shopList;
                  console.log("in response all-networks", $scope.shopList);
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
