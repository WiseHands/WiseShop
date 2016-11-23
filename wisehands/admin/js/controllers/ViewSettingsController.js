angular.module('WiseHands')
    .controller('ViewSettingsController', ['$scope', '$http', 'signout', 'sideNavInit', function ($scope, $http, signout, sideNavInit) {
        $scope.loading = true;
        $http({
            method: 'GET',
            url: '/shop/details',
            headers: {
                'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
            }
        })
            .then(function successCallback(response) {
                $scope.loading = false;
                $scope.shopStyling = response.data.visualSettingsDTO;
            }, function errorCallback(data) {
                $scope.loading = false;
                console.log(data);
                signout.signOut();
            });

        $scope.updateShopStyling = function () {
            $scope.loading = true;
            $http({
                method: 'PUT',
                url: '/visualsettings',
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                },
                data: $scope.shopStyling
            })
                .success(function (response) {
                    $scope.loading = false;
                    $scope.shopStyling = response;
                }).
            error(function (response) {
                if (response.data === 'Invalid X-AUTH-TOKEN') {
                    signout.signOut();
                }
                $scope.loading = false;
                console.log(response);
            });
        };
        sideNavInit.sideNav();
    }]);
