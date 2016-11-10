angular.module('SuperWiseHands')
    .controller('UsersController', ['$scope', '$http', 'sideNavInit',
        function($scope, $http, sideNavInit) {
            sideNavInit.sideNav();
            $scope.loading = true;

            $http({
                method: 'GET',
                url: '/sudo/users',
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                }
            })
                .then(function successCallback(response) {
                    $scope.loading = false;
                    $scope.users = response.data;
                }, function errorCallback(response) {
                    if (response.data.indexOf('Invalid X-AUTH-') !== -1) {
                        signout.signOut();
                    }
                    $scope.loading = false;
                    $scope.status = 'Щось пішло не так...';
                });
        }]);