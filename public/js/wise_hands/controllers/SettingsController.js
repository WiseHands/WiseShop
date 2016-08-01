angular.module('WiseHands')
    .controller('SettingsController', function ($scope, $route, $http) {
        $scope.$route = $route;
        $scope.loading = true;
        $scope.hostName = window.location.hostname;
        $http({
            method: 'GET',
            url: '/shops',
            headers: {
                'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
            }
        })
            .then(function successCallback(response) {
                $scope.loading = false;
                $scope.shops = response.data;
                console.log($scope.shops);
            }, function errorCallback(data) {
                $scope.loading = false;
                $scope.status = 'Щось пішло не так...';
            });


    });
