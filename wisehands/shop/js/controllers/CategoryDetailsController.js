angular.module('WiseShop')
    .controller('CategoryDetailsController', ['$scope', '$http','shared','sideNavInit', '$routeParams', 'PublicShopInfo', '$location',
        function($scope, $http, shared, sideNavInit, $routeParams, PublicShopInfo, $location) {
            $scope.uuid = $routeParams.uuid;
            shared.setCategoryUuid($scope.uuid);
            $http({
                method: 'GET',
                url: '/api/category/' + $scope.uuid

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
                    if($scope.isShopOpenNow){
                        $scope.isNotWorkingTime = true;
                        toastr.warning('Сьогодні не працюємо');
                    }
                }, function errorCallback(error) {
                    console.log(error);
                });

            function loadOptions() {
                $scope.selectedItems = shared.getProductsToBuy();
                $scope.totalQuantity = shared.getTotalQuantity();

            }

            loadOptions();
            $scope.calculateTotal = PublicShopInfo.calculateTotal;
            $scope.reCalculateTotal = function (){
                $scope.calculateTotal();
            };
            $scope.buyStart = function (productDTO) {

                var isActivePropertyTagsMoreThanTwo = 0;

                productDTO.properties.forEach(function (property) {
                    property.tags = property.tags.filter(function (tag) {
                        return tag.selected;
                    });
                    isActivePropertyTagsMoreThanTwo += property.tags.length;
                });

                PublicShopInfo.handleWorkingHours($scope);
                if($scope.isShopOpenNow){
                    toastr.warning('Сьогодні не працюємо');
                } else if(!$scope.isNotWorkingTime) {
                    toastr.warning('Ми працюємо з ' + $scope.startHour + '-' + $scope.startMinute + ' до ' + $scope.endHour + '-' + $scope.endMinute);
                } else if (isActivePropertyTagsMoreThanTwo > 1) {

                    $location.path('/product/' + productDTO.uuid);

                } else {
                        productDTO.quantity = 1;
                        shared.addProductToBuy(productDTO);
                        $scope.calculateTotal();
                }
                $scope.totalQuantity = shared.getTotalQuantity();


            };
            sideNavInit.sideNav();
        }]);

