(function(){
    angular.module('WiseShop')
        .controller('ShoppingCartController', ['$scope', '$http', 'shared', 'PublicShopInfo',
        function($scope, $http, shared, PublicShopInfo) {
            function loadOptions() {
                $scope.total =  shared.reCalculateTotal();
                $scope.productQuantityList = shared.getProductsToBuy();
                console.log('loaded', shared.getProductsToBuy());
            }
            loadOptions();



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
              if(!quantity) {
                quantity = 1;
              }
                shared.setProductQuantity(index, quantity);
                $scope.total = shared.reCalculateTotal();
            };

            $scope.removeSelectedItem = function (index){
                shared.getProductsToBuy().splice(index, 1);
                shared.reCalculateTotal();
                shared.reCalculateQuantity();
                loadOptions();

            };
            $scope.removeAll = function () {
                shared.clearProducts();
                shared.reCalculateTotal();
                shared.reCalculateQuantity();
                loadOptions();
            };

        }]);
})();
