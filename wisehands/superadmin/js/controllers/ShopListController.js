angular.module('SuperWiseHands')
        .controller('ShopListController', ['$scope', '$http', 'sideNavInit', 'signout',
            function($scope, $http, sideNavInit, signout) {
                sideNavInit.sideNav();

                $scope.loading = true;

                $http({
                    method: 'GET',
                    url: '/sudo/shops',
                    headers: {
                        'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                        'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                    }
                })
                    .then(function successCallback(response) {
                        $scope.loading = false;
                        $scope.shops = response.data;
                    }, function errorCallback(response) {
                        if (response.data.indexOf('Invalid X-AUTH-') !== -1) {
                            signout.signOut();
                        }
                        $scope.loading = false;
                        $scope.status = 'Щось пішло не так...';
                    });

}]);