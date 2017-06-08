angular.module('WiseShop')
    .controller('CategoryDetailsController', ['$scope', '$http','shared','sideNavInit', '$routeParams', 'PublicShopInfo', '$location',
        function($scope, $http, shared, sideNavInit, $routeParams, PublicShopInfo, $location) {
            $scope.uuid = $routeParams.uuid;
            shared.setCategoryUuid($scope.uuid);
            $http({
                method: 'GET',
                url: '/category/' + $scope.uuid

            })
                .then(function successCallback(response) {
                    $scope.products = response.data;
                }, function errorCallback(data) {
                    console.log(data);
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
            }

            loadOptions();
            $scope.calculateTotal = PublicShopInfo.calculateTotal;
            $scope.reCalculateTotal = function (){
                $scope.calculateTotal();
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

                var isActivePropertyTagsMoreThanTwo = 0;

                productDTO.properties.forEach(function (property) {
                    property.tags = property.tags.filter(function (tag) {
                        return tag.selected;
                    });
                    isActivePropertyTagsMoreThanTwo += property.tags.length;
                });

                if($scope.isNotWorkingTime) {
                    toastr.warning('Ми працюємо з ' + $scope.startHour + '-' + $scope.startMinute + ' до ' + $scope.endHour + '-' + $scope.endMinute);
                } else if (isActivePropertyTagsMoreThanTwo > 1) {

                    $location.path('/product/' + productDTO.uuid);

                } else if (!$scope.found) {

                    if ($scope.selectedItems.indexOf(productDTO) == -1) {
                        productDTO.quantity = 1;
                        $scope.selectedItems.push(productDTO);
                        $scope.calculateTotal();

                    } else {
                        productDTO.quantity ++;
                        $scope.calculateTotal();
                    }

                    $scope.totalItems = 0;
                    $scope.selectedItems.forEach(function(selectedItem) {
                        $scope.totalItems += selectedItem.quantity;

                    });

                } else {
                    $scope.productFromBin.quantity ++;
                    $scope.calculateTotal();
                }

            };
            sideNavInit.sideNav();
        }]);

