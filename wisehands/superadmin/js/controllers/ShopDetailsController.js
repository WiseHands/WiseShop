angular.module('SuperWiseHands')
    .controller('ShopDetailsController', ['$scope', '$http', 'sideNavInit', '$routeParams',
        function($scope, $http, sideNavInit, $routeParams) {
            sideNavInit.sideNav();
            $scope.uuid = $routeParams.uuid;
            $scope.loading = true;

            $http({
                method: 'GET',
                url: '/order/' + $routeParams.uuid,
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                }
            })
                .then(function successCallback(response) {
                    $scope.loading = false;
                    $scope.shopDetails = response.data;

                }, function errorCallback(response) {
                    if (response.data === 'Invalid X-AUTH-TOKEN') {
                        signout.signOut();
                    }
                    $scope.loading = false;
                    $scope.status = 'Щось пішло не так...';
                });

        }]);