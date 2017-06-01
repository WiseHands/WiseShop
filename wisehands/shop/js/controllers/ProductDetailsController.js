(function(){
    angular.module('WiseShop')
        .controller('ProductDetailsController', ['$scope', '$http', '$location', '$routeParams','shared', 'PublicShopInfo',
            function($scope, $http, $location, $routeParams, shared, PublicShopInfo) {
            $scope.uuid = $routeParams.uuid;
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
                url: '/product/' + $scope.uuid
            })
                .then(function successCallback(response) {
                    $scope.product = response.data;

                    $("meta[name='description']").attr('content', $scope.product.description);
                    document.title = $scope.product.name + " | " + $scope.product.categoryName;
                    $scope.product.images.forEach(function(image, index){
                        if(image.uuid === $scope.product.mainImage.uuid){
                            $scope.selected = index;
                        }
                    });
                    $scope.found = false;
                    for(var i = 0; i < $scope.selectedItems.length; i++) {
                        if ($scope.selectedItems[i].uuid === $scope.product.uuid) {
                            $scope.found = true;
                            break;
                        }
                    }

                    $scope.loading = false;
                }, function errorCallback(error) {
                    $scope.loading = false;
                    console.log(error);
                });

            $scope.getAdditionalPriceLabel = function(option) {
                if(option.additionalPrice === 0) {
                    return '';
                }
                return ' (+' + option.additionalPrice + ')';
            };

                $scope.selectAction = function(option) {
                    debugger;
                    console.log(option);
                };

            $scope.select = function(index) {
                $scope.selected = index;
            };
                
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
                $scope.reCalculateTotal = function (){
                    $scope.calculateTotal($scope);
                };
                $scope.buyStart = function () {

                    PublicShopInfo.handleWorkingHours($scope);

                    if($scope.isNotWorkingTime) {
                        toastr.warning('Ми працюємо з ' + $scope.startHour + '-' + $scope.startMinute + ' до ' + $scope.endHour + '-' + $scope.endMinute);
                    } else {
                        if (!$scope.found) {
                            $scope.product.quantity = 1;
                            $scope.selectedItems.push($scope.product);
                            $scope.calculateTotal($scope);
                            shared.setSelectedItems($scope.selectedItems);

                            for(var i = 0; i < $scope.selectedItems.length; i++) {
                                if ($scope.selectedItems[i].uuid === $scope.product.uuid) {
                                    $scope.found = true;
                                    var productFromBin = $scope.selectedItems[i];
                                    break;
                                }
                            }
                        } else {
                            for(var i = 0; i < $scope.selectedItems.length; i++) {
                                if ($scope.selectedItems[i].uuid === $scope.product.uuid) {
                                    $scope.found = true;
                                    var productFromBin = $scope.selectedItems[i];
                                    productFromBin.quantity ++;
                                    $scope.calculateTotal($scope);
                                    shared.setSelectedItems($scope.selectedItems);

                                    break;
                                }
                            }
                        }
                    }
                };

                $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
                        $('.mdb-select').material_select();
                });


            }]);


})();
