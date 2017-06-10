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


                function loadOptions() {
                    $scope.selectedItems = shared.getProductsToBuy();
                    $scope.totalQuantity = shared.getTotalQuantity();

                }

                loadOptions();

            $http({
                method: 'GET',
                url: '/product/' + $scope.uuid
            })
                .then(function successCallback(response) {
                    $scope.product = response.data;
                    $scope.defaultProductPrice = $scope.product.price;
                    $scope.calculatedProductPrice = $scope.product.price;
                    $scope.product.properties.forEach(function (property) {
                        property.tags = property.tags.filter(function (tag) {
                            return tag.selected;
                        });
                        var idCounter = 1;
                        property.tags.forEach(function (tag) {
                            if (tag.additionalPrice > 0) {
                                tag.value = tag.value + ' +' + tag.additionalPrice;
                            }
                            tag.id = idCounter;
                            idCounter ++;
                        });
                        property.selectedTag = null;
                    });


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

                var properties = [];

            $scope.selectedOption = function (property) {
                $scope.defaultProductPrice = $scope.product.price;

                for(var i = 0; i < properties.length; i++) {
                    if (properties[i].productPropertyUuid === property.productPropertyUuid) {
                        properties.splice(i, 1);
                    }
                }
                properties.push(property);

                var additionalPrices = 0;

                properties.forEach(function (property) {
                    additionalPrices += property.additionalPrice;
                });

                $scope.calculatedProductPrice = $scope.defaultProductPrice + additionalPrices;
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


                $scope.calculateTotal = PublicShopInfo.calculateTotal;
                $scope.reCalculateTotal = function (){
                    $scope.calculateTotal();
                };


                var productsToBuy = [];
                $scope.buyStart = function () {
                    var options = [].slice.call(document.querySelectorAll('[property-uuid]'));
                    var visibleOptions = options.filter(function (option) {
                        return option.classList.value.indexOf('ng-hide') === -1;
                    });
                    visibleOptions.forEach(function (option) {

                        var foundMatch = properties.filter(function(property) {
                            var propertyUuid = option.getAttribute('property-uuid');
                            var currentPropertyUuid = property.currentPropertyUuid;

                            return currentPropertyUuid === propertyUuid;
                        });
                        if(foundMatch.length === 0) {
                            option.querySelector('a').style.border = '1px solid red';
                        } else {
                            option.querySelector('a').style.border = '1px solid #ddd';
                        }

                    });

                    var activeProperties = $scope.product.properties.filter(function (property) {
                            return property.tags.length > 1;
                    });


                    if(properties.length === activeProperties.length) {

                        PublicShopInfo.handleWorkingHours($scope);

                        if($scope.isNotWorkingTime) {
                            toastr.warning('Ми працюємо з ' + $scope.startHour + '-' + $scope.startMinute + ' до ' + $scope.endHour + '-' + $scope.endMinute);
                        } else {
                            var chosenProperties = [];
                            if (properties.length > 0) {
                                    properties.forEach(function(chosenProperty){
                                        chosenProperties.push({
                                            uuid: chosenProperty.uuid,
                                            additionalPrice: chosenProperty.additionalPrice,
                                            name: chosenProperty.value
                                        });
                                    });
                            }
                            var productToBuy = {
                                uuid: $scope.product.uuid,
                                chosenProperties: chosenProperties,
                                price: $scope.calculatedProductPrice,
                                name: $scope.product.name
                            };
                            $scope.product.chosenProperties = chosenProperties;
                            var copyOfProduct = JSON.parse(JSON.stringify(productToBuy));
                            shared.addProductToBuy(copyOfProduct);
                            $scope.calculateTotal();



                        }
                    }
                    $scope.totalQuantity = shared.getTotalQuantity();


                };

                $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
                        $('.mdb-select').material_select();
                });


            }]);


})();
