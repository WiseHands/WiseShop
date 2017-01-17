(function(){
    angular.module('WiseShop')
        .controller('ShopController', ['$scope', '$http', 'shared', 'sideNavInit', 'PublicShopInfo',  function($scope, $http, shared, sideNavInit, PublicShopInfo) {
            $http({
                method: 'GET',
                url: '/products'
            })
                .then(function successCallback(response) {
                    $scope.products = response.data;
                }, function errorCallback(error) {
                    console.log(error);
                });

            $http({
                method: 'GET',
                url: '/shop/details/public'
            })
                .then(function successCallback(response) {
                    PublicShopInfo.handlePublicShopInfo($scope, response);
                }, function errorCallback(error) {
                    console.log(error);
                });

            function loadOptions() {
                $scope.selectedItems = shared.getSelectedItems();
                $scope.totalItems = shared.getTotalItems();
            }

            loadOptions();
            $scope.calculateTotal = PublicShopInfo.calculateTotal;
            $scope.reCalculateTotal = function () {
                $scope.calculateTotal($scope);
            };
            $scope.buyStart = function (productDTO) {
                $scope.found = false;
                $scope.selectedItems.forEach(function (selectedItem) {
                    if(selectedItem.uuid === productDTO.uuid){
                        $scope.found = true;
                        $scope.productFromBin = selectedItem;
                    }
                });

                PublicShopInfo.handleWorkingHours($scope);

                if($scope.isNotWorkingTime) {
                    toastr.warning('Ми працюємо з ' + $scope.startHour + '-' + $scope.startMinute + ' до ' + $scope.endHour + '-' + $scope.endMinute);
                } else if (!$scope.found) {

                    if ($scope.selectedItems.indexOf(productDTO) == -1) {
                        productDTO.quantity = 1;
                        $scope.selectedItems.push(productDTO);
                        shared.setSelectedItems($scope.selectedItems);
                        $scope.calculateTotal($scope);

                    } else {
                        productDTO.quantity ++;
                        shared.setSelectedItems($scope.selectedItems);
                        $scope.calculateTotal($scope);
                    }

                    $scope.totalItems = 0;
                    $scope.selectedItems.forEach(function(selectedItem) {
                        $scope.totalItems += selectedItem.quantity;

                    });

                } else {
                    $scope.productFromBin.quantity ++;
                    shared.setSelectedItems($scope.selectedItems);
                    $scope.calculateTotal($scope);
                }
            };

            sideNavInit.sideNav();
        }]);
})();
