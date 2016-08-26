angular.module('WiseHands')
    .controller('ContactsController', function ($scope, $route, $http, $location) {
        $scope.$route = $route;
        $scope.loading = true;

        $scope.activeShop = {
            domain: '',
            shopName: ''
        };

        $http({
            method: 'GET',
            url: '/contact/details'
        })
            .then(function successCallback(response) {
                $scope.loading = false;
                $scope.contacts = response.data;
            }, function errorCallback(data) {
                $scope.loading = false;
                $scope.status = 'Щось пішло не так...';
            });
        $scope.updateContacts = function () {
            $scope.loading = true;
            $http({
                method: 'PUT',
                url: '/contact',
                data: $scope.contacts,
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                }
            })
                .then(function successCallback(response) {
                    $scope.loading = false;
                }, function errorCallback(error) {
                    $scope.loading = false;
                    console.log(error);
                });

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

            }, function errorCallback(data) {
                $scope.status = 'Щось пішло не так...';
            });

        $scope.getUrl = function (shop) {
            return  window.location.protocol + '//' + shop.domain + ':' + window.location.port;
        };
        $scope.signOut = function () {
            localStorage.clear();
            window.location = '/';
        }
    });
