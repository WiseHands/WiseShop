angular.module('WiseHands')
    .controller('DeliverySettingsController', ['$scope', '$http', '$location', 'sideNavInit', 'signout', function ($scope, $http, $location, sideNavInit, signout) {
        $scope.loading = true;
        
        $http({
            method: 'GET',
            url: '/delivery',
            headers: {
                'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
            }
        })
            .then(function successCallback(response) {
                $scope.loading = false;
                $scope.delivery = response.data;
            }, function errorCallback(response) {
                if (response.data === 'Invalid X-AUTH-TOKEN') {
                    signout.signOut();
                }
                $scope.loading = false;
            });
        $scope.setDeliveryOptions = function () {
            $scope.loading = true;
            $http({
                method: 'PUT',
                url: '/delivery',
                data: $scope.delivery,
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                }
            })
                .then(function successCallback(response) {
                    $scope.loading = false;
                    $location.path('/delivery');
                }, function errorCallback(response) {
                    if (response.data === 'Invalid X-AUTH-TOKEN') {
                        signout.signOut();
                    }
                    $scope.loading = false;
                    console.log(response);
                });

        };
        
        sideNavInit.sideNav();
       
    }]);
