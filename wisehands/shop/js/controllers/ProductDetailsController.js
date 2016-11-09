(function(){
    angular.module('WiseShop')
        .controller('ProductDetailsController', ['$scope', '$http', '$location', '$routeParams','shared',
            function($scope, $http, $location, $routeParams, shared) {
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
                    $scope.product.images.forEach(function(image, index){
                        if(image.uuid === $scope.product.mainImage.uuid){
                            $scope.selected = index;
                        }
                    });
                    $('input:radio[name=deliverance]:not(:disabled):first').click();

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

            $scope.select= function(index) {
                $scope.selected = index;
            };
                
            $http({
                method: 'GET',
                url: '/delivery'
            })
                .then(function successCallback(response) {
                    $scope.deliverance = response.data;
                }, function errorCallback(error) {
                    console.log(error);
                });


            $http({
                method: 'GET',
                url: '/shop/details/public'
            })
                .then(function successCallback(response) {
                    document.title = response.data.name;
                    $scope.shopName = response.data.name;
                    $scope.shopId = response.data.uuid;
                    $scope.minOrderForFreeDelivery = response.data.freeDeliveryLimit;
                    $scope.payLateButton = response.data.manualPaymentEnabled;
                    $scope.startTime = new Date(response.data.startTime);
                    $scope.startHour = ($scope.startTime.getHours()<10?'0':'') + $scope.startTime.getHours();
                    $scope.startMinute = ($scope.startTime.getMinutes()<10?'0':'') + $scope.startTime.getMinutes();
                    $scope.endTime = new Date(response.data.endTime);
                    $scope.endHour = ($scope.endTime.getHours()<10?'0':'') + $scope.endTime.getHours();
                    $scope.endMinute = ($scope.endTime.getMinutes()<10?'0':'') + $scope.endTime.getMinutes();

                }, function errorCallback(error) {
                    console.log(error);
                });
                $scope.delivery = function () {
                    if ($scope.delivery.radio === 'NOVAPOSHTA') {
                    }
                    if ($scope.delivery.radio === 'COURIER') {
                        if($scope.total < $scope.minOrderForFreeDelivery){
                            return ' + ' + $scope.deliverance.courierPrice;
                        } else {
                            return '';
                        }
                    } else if ($scope.delivery.radio === 'SELFTAKE'){
                        return '';
                    }

                    return '';
                };

                function loadOptions() {
                    $scope.selectedItems = shared.getSelectedItems();
                    $scope.totalItems = shared.getTotalItems();
                }

                loadOptions();

                $scope.buyStart = function ($event) {

                    var today = new Date();

                    var startMinutes = $scope.startTime.getHours() * 60 + $scope.startTime.getMinutes();
                    var endMinutes = $scope.endTime.getHours() * 60 + $scope.endTime.getMinutes();
                    var nowMinutes = today.getHours() * 60 + today.getMinutes();

                    var isNotWorkingTime = nowMinutes < startMinutes || nowMinutes >= endMinutes;


                    if(isNotWorkingTime) {
                        toastr.warning('Ми працюємо з ' + $scope.startHour + '-' + $scope.startMinute + ' до ' + $scope.endHour + '-' + $scope.endMinute);
                    } else {
                        if (!$scope.found) {
                            $scope.product.quantity = 1;
                            $scope.selectedItems.push($scope.product);
                            $scope.calculateTotal();
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
                                    $scope.calculateTotal();
                                    shared.setSelectedItems($scope.selectedItems);

                                    break;
                                }
                            }

                        }
                        if ($event.stopPropagation) $event.stopPropagation();
                        if ($event.preventDefault) $event.preventDefault();
                        $event.cancelBubble = true;
                        $event.returnValue = false;



                    }

                };

                $scope.calculateTotal = function(){
                    $scope.total = 0;
                    $scope.totalItems = 0;
                    for(var i =0; i < $scope.selectedItems.length; i++){
                        var item = $scope.selectedItems[i];
                        $scope.total += (item.quantity * item.price);
                        $scope.totalItems += item.quantity;

                    }
                    shared.setTotalItems($scope.totalItems);

                };

                $scope.removeSelectedItem = function (index){
                    if ($scope.selectedItems[index].uuid === $scope.product.uuid) {
                        $scope.found = false;
                    }
                    $scope.selectedItems.splice(index, 1);
                    $scope.calculateTotal();
                    shared.setSelectedItems($scope.selectedItems);
                };

                $scope.removeAll = function () {
                    $scope.selectedItems = [];
                    $scope.calculateTotal();
                    shared.setSelectedItems($scope.selectedItems);
                    $scope.found = false;
                };

                $scope.makeOrder = function (){


                    $scope.loading = true;

                    var params = {
                        deliveryType: $scope.delivery.radio,
                        phone: new String(document.getElementById('phone').value),
                        name: document.getElementById('name').value,
                        address: document.getElementById('address').value,
                        newPostDepartment: $scope.delivery.newPost,
                        selectedItems: $scope.selectedItems,
                        comment: document.getElementById('comment').value
                    };

                    var encodedParams = encodeQueryData(params);

                    $http({
                        method: 'POST',
                        url: '/order',
                        data: params
                    })
                        .then(function successCallback(response) {
                            $scope.loading = false;
                            $scope.successfullResponse = true;
                            var modalContent = document.querySelector(".proceedWithPayment");
                            modalContent.innerHTML = response.data.button;
                            $scope.currentOrderUuid = response.data.uuid;
                        }, function errorCallback(data) {
                            $scope.loading = false;
                            console.log(data);
                        });
                };
                $scope.payOrder = function () {
                    $("#paymentButton").click(function(e) {
                        var rootDiv = document.querySelector('.proceedWithPayment');
                        rootDiv.firstChild.submit();
                    });
                };

                $scope.payLater = function () {
                    $http({
                        method: 'PUT',
                        url: '/order/' + $scope.currentOrderUuid + '/manually-payed'
                    })
                        .then(function successCallback(response) {
                            window.location.pathname = '/done';
                        }, function errorCallback(data) {
                            console.log(data);
                        });
                    $scope.selectedItems = [];
                    $('#cart-modal-ex').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    $scope.successfullResponse = false;
                };



            }]);


})();


function encodeQueryData(data)
{
    var ret = [];
    for (var d in data)
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
}