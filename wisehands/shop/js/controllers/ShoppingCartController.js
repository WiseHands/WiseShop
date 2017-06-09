(function(){
    angular.module('WiseShop')
        .controller('ShoppingCartController', ['$scope', '$http', 'shared', 'PublicShopInfo',
        function($scope, $http, shared, PublicShopInfo) {
            function loadOptions() {
                $scope.total =  shared.getTotal();
                $scope.productQuantityList = shared.getProductsToBuy();
            }
            loadOptions();

            $scope.calculateTotal = PublicShopInfo.calculateTotal;


            $http({
                method: 'GET',
                url: '/shop/details/public'
            })
                .then(function successCallback(response) {
                    $scope.shopName = response.data.name;
                    $scope.shopId = response.data.uuid;
                }, function errorCallback(error) {
                    console.log(error);
                });

            $scope.changeQuantity = function (index, quantity) {

            };

            $scope.calculateTotal = PublicShopInfo.calculateTotal;
            $scope.reCalculateTotal = function () {
                $scope.calculateTotal();
            };
            $scope.removeSelectedItem = function (index){
                shared.getProductsToBuy().splice(index, 1);
                $scope.calculateTotal();
                loadOptions();

            };
            $scope.removeAll = function () {
                shared.clearProducts();
                $scope.calculateTotal();
                loadOptions();
            };

        }]);
})();