angular.module('WiseHands')
    .controller('DeliverySettingsController', ['$scope', '$http', '$location', 'sideNavInit', 'signout', function ($scope, $http, $location, sideNavInit, signout) {
        $scope.loading = true;
        
        $http({
            method: 'GET',
            url: '/delivery',

        })
            .then(function successCallback(response) {
                $scope.loading = false;
                $scope.delivery = response.data;
            }, function errorCallback(response) {
                $scope.loading = false;
            });
        $scope.setDeliveryOptions = function () {
            $scope.loading = true;
            $http({
                method: 'PUT',
                url: '/delivery',
                data: $scope.delivery,

            })
                .then(function successCallback(response) {
                    $scope.loading = false;
                    $location.path('/delivery');
                }, function errorCallback(response) {
                    $scope.loading = false;
                    console.log(response);
                });

        };
        
        sideNavInit.sideNav();
       
    }]);
