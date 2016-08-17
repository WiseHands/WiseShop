(function(){
    angular.module('WiseShop')
        .controller('ContactsController', function($scope, $http, $route) {
            $http({
                method: 'GET',
                url: '/shop/details/public'
            })
                .then(function successCallback(response) {
                    document.title = response.data;
                    $scope.shopName = response.data;

                }, function errorCallback(error) {
                        console.log(error);
                });

            $scope.reloadPage = function(){
                window.location.reload();
            };

            $http({
                method: 'GET',
                url: '/contact/details'
            })
                .then(function successCallback(response) {
                    $scope.contacts = response.data;
                }, function errorCallback(data) {
                    $scope.status = 'Щось пішло не так...';
                });

        });


})();