angular.module('WiseHands')
    .controller('ShopsController', ['$scope', '$http', 'sideNavInit', 'signout', function ($scope, $http, sideNavInit, signout) {
        $scope.loading = true;

        sideNavInit.sideNav();

        $http({
            method: 'GET',
            url: '/shop-network'
        })
            .then(function successCallback(response){
                $scope.networkName = response.data.networkName;
                $scope.departments = response.data.shopList;
                // var department = response.data[0];
                console.log("in response", response);
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
