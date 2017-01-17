(function(){
    angular.module('WiseShop')
        .controller('ShoppingCartController', ['$scope', '$http', 'shared', 'PublicShopInfo',
        function($scope, $http, shared, PublicShopInfo) {
            function loadOptions() {
                $scope.selectedItems = shared.getSelectedItems();
                $scope.totalItems = shared.getTotalItems();
                $scope.total =  shared.getTotal();
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

            $scope.calculateTotal = PublicShopInfo.calculateTotal;
            $scope.reCalculateTotal = function () {
                $scope.calculateTotal($scope);
            };
            $scope.removeSelectedItem = function (index){
                $scope.selectedItems.splice(index, 1);
                $scope.calculateTotal($scope);
                shared.setSelectedItems($scope.selectedItems);

            };
            $scope.removeAll = function () {
                $scope.selectedItems.length = 0;
                $scope.calculateTotal($scope);
                shared.setSelectedItems($scope.selectedItems);
            };
            $scope.reCalculateTotal = function () {
                $scope.calculateTotal($scope);
            };
        }]);
})();