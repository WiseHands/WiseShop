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


        });


})();