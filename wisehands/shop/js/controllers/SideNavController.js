angular.module('WiseShop')
    .controller('SideNavController', ['$scope', '$http', '$route',
        function ($scope, $http, $route) {
            $scope.$route = $route;
            $scope.categoryUuid = location.hash.split('#/category/')[1];
            $scope.productUuid = location.hash.split('#/product/')[1];
            $http({
                method: 'GET',
                url: '/category'

            })
                .then(function successCallback(response) {
                   $scope.categories = response.data;
                   $scope.categories.forEach(function (category) {
                       category.products.forEach(function (product) {
                           if ($scope.productUuid === product.uuid){
                               $scope.categoryUuid = product.categoryUuid;
                           }
                       })

                    })
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
