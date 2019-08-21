(function(){
    angular.module('WiseShop')
        .controller('WholesaleShoppingCartController', ['$scope', '$http', 'shared', 'PublicShopInfo',
        function($scope, $http, shared, PublicShopInfo) {
            function loadOptions() {
                $scope.totalWholesalePrice =  shared.reCalculateTotalWholesale();
                $scope.wholesaleCount = shared.reCalculateWholesaleCount();
                $scope.productQuantityList = shared.getProductsToBuy();
                console.log('loaded', shared.getProductsToBuy());
            }
            loadOptions();

            $http({
                method: 'GET',
                url: '/shop/details/public'
            })
                .then(function successCallback(response) {
                    console.log("public response" + response.data)
                    $scope.shopName = response.data.name;
                    $scope.shopId = response.data.uuid;
                }, function errorCallback(error) {
                    console.log(error);
                });

            $scope.changeQuantity = function (index, quantity) {
              if(!quantity) {
                quantity = 1;
              }
                shared.setProductQuantity(index, quantity);
                $scope.totalWholesalePrice = shared.reCalculateTotalWholesale();
                $scope.wholesaleCount = shared.reCalculateWholesaleCount();

            };

            $scope.removeSelectedItem = function (index){
                shared.getProductsToBuy().splice(index, 1);
                shared.reCalculateTotalWholesale();
                shared.reCalculateQuantity();
                loadOptions();

            };
            $scope.removeAll = function () {
                shared.clearProducts();
                shared.reCalculateTotalWholesale();
                shared.reCalculateWholesaleCount();
                shared.reCalculateQuantity();
                loadOptions();
            };

        }]);
})();
