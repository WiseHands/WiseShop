(function(){
    angular.module('WiseShop')
        .controller('ShopController', ['$scope', '$http', 'shared', 'sideNavInit', 'PublicShopInfo', 'isUserAdmin', '$location',
            function($scope, $http, shared, sideNavInit, PublicShopInfo, isUserAdmin, $location) {


                function isShopSelectedByUser(){
                    if(window.isSelected) {
                        return window.isSelected;
                    }

                    let isSelected = location.hash.indexOf('#selectedShop=true') !== -1;
                    console.log("isSelected", isSelected);
                    window.isSelected = isSelected;
                    return isSelected;
                }


            
                isUserAdmin.get(function(){
                    $scope.isUserAdmin = true;
                });


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
                    // console.log("detail response", response);
                    PublicShopInfo.handlePublicShopInfo($scope, response);
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

                var network = [];

                $http({
                method: 'GET',
                url: '/network'
            })
               .then(function successCallback(response){
                if (response.data == null) {
                    network = [];
                } else {
                    network = response.data.shopList;
                }

                if (network.length > 0) {
                    $scope.isShopInNetwork = true;
                } else {
                    $scope.isShopInNetwork = false;
                }
                }, function errorCallback(data){
            });

            $scope.buyStart = function (productDTO, $event) {
                $event.stopPropagation();
                let isShopSelected;
                if(network.length > 1) {
                    isShopSelected = false;
                }
                isShopSelected = isShopSelectedByUser();

                console.log("network.length > 1", network.length > 1);
                console.log("isShopSelected()", isShopSelectedByUser());

                if (!isShopSelected){
                    $location.path('/othershops');
                } else {

                    let isActivePropertyTagsMoreThanTwo = 0;

                    productDTO.properties.forEach(function (property) {
                        property.tags = property.tags.filter(function (tag) {
                            return tag.selected;
                        });
                        isActivePropertyTagsMoreThanTwo += property.tags.length;
                    });

                    PublicShopInfo.handleWorkingHours($scope);

                    if($scope.isNotWorkingTime) {
                        toastr.warning('Ми працюємо з ' + $scope.startHour + '-' + $scope.startMinute + ' до ' + $scope.endHour + '-' + $scope.endMinute);
                    }

                    else if (isActivePropertyTagsMoreThanTwo > 0) {
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

                }







            };

            $scope.navigateToProductDetails = function (uuid) {
                window.location.hash = '#!/product/' + uuid;
            };

            sideNavInit.sideNav();
        }]);
})();
