angular.module('WiseShop')
    .controller('SideNavController', ['$scope', '$http', '$route', '$window',
        function ($scope, $http, $route, $window) {
            $scope.$route = $route;
            $http({
                method: 'GET',
                url: '/category'

            })
                .then(function successCallback(response) {
                   $scope.categories = response.data;
                }, function errorCallback(data) {
                    console.log('error retrieving profile');
                });


            $http({
                method: 'GET',
                url: '/shop/details/public'

            })
                .then(function successCallback(response) {
                    $scope.shopName = response.data.name;
                }, function errorCallback(response) {
                    console.log(response);
                    $scope.status = 'Щось пішло не так...';
                });


        }]);
