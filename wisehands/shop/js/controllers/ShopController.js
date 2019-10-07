(function(){
    angular.module('WiseShop')
        .controller('ShopController', ['$scope', '$http', 'shared', 'sideNavInit', 'PublicShopInfo', 'isUserAdmin', '$location',
            function($scope, $http, shared, sideNavInit, PublicShopInfo, isUserAdmin, $location) {


                function isShopSelectedByUser(){
                    if(window.isSelected) {
                        return window.isSelected;
                    }

                    let isSelected = location.hash.indexOf('#selectedShop=true') !== -1;
                    window.isSelected = isSelected;
                    return isSelected;
                };

                var isShopSelected;

                var network = [];

                $http({
                    method: 'GET',
                    url: '/network'
                })
                    .then(function successCallback(response){
                        if (response.data == null) {
                            network = [];
                            isShopSelected = isShopSelectedByUser();
                            console.log("network response when data null", network, isShopSelected);
                        } else {
                            network = response.data.shopList;
                            isShopSelected = isShopSelectedByUser();
                            if((network.length > 1) && (!isShopSelected)) {
                                $location.path('/othershops');
                            };
                            console.log("network response when data !null", network, isShopSelected);
                        }
                        if (network.length > 0) {
                            $scope.isShopInNetwork = true;
                            console.log("network_length ", network.length);
                        } else {
                            $scope.isShopInNetwork = false;
                            console.log("network_length ", network.length);
                        }
                    }, function errorCallback(data){
                    });

                isUserAdmin.get(function(){
                    $scope.isUserAdmin = true;
                });

                $http({
                    method: 'GET',
                    url: '/products'
                })
                    .then(function successCallback(response) {
                        $scope.products = response.data;
                        console.log("$scope.products", $scope.products);
                    }, function errorCallback(error) {
                        console.log(error);
                    });

                $http({
                    method: 'GET',
                    url: '/shop/details/public'
                })
                    .then(function successCallback(response) {
                        console.log("response: ", response.data);
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

                $scope.reCalculateTotal = function () {
                    $scope.calculateTotal();
                };



                $scope.buyStart = function (productDTO, $event) {

                    buyProduct(productDTO, $event);

                };

                function buyProduct(productDTO, $event) {
                     $event.stopPropagation();

                     let isActivePropertyTagsMoreThanTwo = 0;

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
                    } else if (isActivePropertyTagsMoreThanTwo > 0) {
                         $location.path('/product/' + productDTO.uuid);
                    } else {

                         var productToBuy = {
                             uuid: productDTO.uuid,
                             chosenProperties: [],
                             price: productDTO.price,
                             name: productDTO.name
                         };
                         shared.addProductToBuy(productToBuy);
                         $scope.calculateTotal();
                    }
                    $scope.totalQuantity = shared.getTotalQuantity();

                };

                $scope.navigateToProductDetails = function (uuid) {
                    window.location.hash = '#!/product/' + uuid;
                };

                sideNavInit.sideNav();


            }]);
})();
