angular.module('WiseShop')
    .controller('SideNavController', ['$scope', '$http', '$route', '$routeParams', 'shared',
        function ($scope, $http, $route, $routeParams, shared) {
            $scope.$route = $route;
            $scope.$watch(function() {
                $scope.categoryUuid = shared.getCategoryUuid();
            });
            
            $http({
                method: 'GET',
                url: '/api/category'

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
                    $scope.activeShop = response.data;
                    $scope.shopName = $scope.activeShop.name;
                    localStorage.setItem('activeShop', $scope.activeShop.uuid);
                }, function errorCallback(response) {
                    console.log(response);
                    $scope.status = 'Щось пішло не так...';
                });

            $scope.turnedOffProducts = function (category) {
            	if(category.isHidden) {
            		return true
            	}
                $scope.turnedOffProductsQuantity = 0;
                category.products.forEach(function(product){
                    if(product.isActive === false) {
                        $scope.turnedOffProductsQuantity ++;
                    }
                });
                if ($scope.turnedOffProductsQuantity === category.products.length || category.products.length === 0){
                    return true;
                } else {
                    return false;
                }

            }


        }]);
