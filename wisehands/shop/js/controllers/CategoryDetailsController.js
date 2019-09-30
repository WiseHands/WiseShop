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
                $scope.selectedItems = shared.getProductsToBuy();
                $scope.totalQuantity = shared.getTotalQuantity();

            }

            loadOptions();
            $scope.calculateTotal = PublicShopInfo.calculateTotal;
            $scope.reCalculateTotal = function (){
                $scope.calculateTotal();
            };
            $scope.buyStart = function (productDTO) {

                let currDate =  new Date();
                let currTime = currDate.getHours() * 60 + currDate.getMinutes();
                var firstTime = Number($scope.startHour * 60) + Number($scope.startMinute);
                var lastTime = Number($scope.endHour * 60) + Number($scope.endMinute);
                var isNotWorkingTime;
                console.log("$scope.alwaysOpen", $scope.alwaysOpen);
                if ($scope.alwaysOpen === true) {
                    isNotWorkingTime = true;
                } else if (currTime >= firstTime && currTime < lastTime){
                    isNotWorkingTime = true;
                } else {
                    isNotWorkingTime = false;
                }

                var isActivePropertyTagsMoreThanTwo = 0;

                productDTO.properties.forEach(function (property) {
                    property.tags = property.tags.filter(function (tag) {
                        return tag.selected;
                    });
                    isActivePropertyTagsMoreThanTwo += property.tags.length;
                });

                if(!isNotWorkingTime) {
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

