angular.module('WiseShop')
    .controller('SideNavController', ['$scope', '$http', '$route', '$routeParams', 'shared',
        function ($scope, $http, $route, $routeParams, shared) {
            $scope.$route = $route;
            $scope.$watch(function() {
                $scope.categoryUuid = shared.getCategoryUuid();
            });
            
            $http({
                method: 'GET',
                url: '/category'

            })
                .then(function successCallback(response) {
                   $scope.categories = response.data;
                   
                    $scope.categoryUuid = shared.getCategoryUuid();
                }, function errorCallback(data) {
                    console.log(data);
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
