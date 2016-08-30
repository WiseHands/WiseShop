angular.module('WiseHands')
    .controller('UsersSettingsController', function ($scope, $route, $http, signout) {
        $scope.$route = $route;
        $scope.loading = true;

        $scope.activeShop = {
            domain: '',
            shopName: ''
        };

        $http({
            method: 'GET',
            url: '/shop/details',
            headers: {
                'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
            }
        })
            .then(function successCallback(response) {
                $scope.activeShop = response.data;

            }, function errorCallback(response) {
                if (response.data === 'Invalid X-AUTH-TOKEN') {
                    signout.signOut();
                }
                $scope.status = 'Щось пішло не так...';
            });

        $http({
            method: 'GET',
            url: '/shop/user',
            headers: {
                'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
            }
        })
            .then(function successCallback(response) {
                $scope.loading = false;
                $scope.users = response.data;
            }, function errorCallback(data) {
                $scope.loading = false;
                $scope.status = 'Щось пішло не так...';
            });
        $scope.createNewUser = function () {
            $scope.loading = true;
            $http({
                method: 'POST',
                url: '/shop/user?email=' + $scope.newUser.email,
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                }
            })
                .then(function successCallback(response) {
                    $scope.loading = false;
                }, function errorCallback(response) {
                    if (response.data === 'Invalid X-AUTH-TOKEN') {
                        signout.signOut();
                    }
                    $scope.loading = false;
                    console.log(response);
                });

        };

        $scope.getUrl = function (shop) {
            return  window.location.protocol + '//' + shop.domain + ':' + window.location.port;
        };
        $scope.signOut = signout.signOut;
    });
