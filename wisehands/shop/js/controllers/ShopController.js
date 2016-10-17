


// function initAutocomplete() {
//     autocomplete = new google.maps.places.Autocomplete((document.getElementById('address')), {types: ['geocode']});
// }

(function(){
    angular.module('WiseShop')
        .controller('ShopController', ['$scope', '$http','shared',  function($scope, $http, shared) {
            
            $scope.minOrderForFreeDelivery = 501;
            $http({
                method: 'GET',
                url: '/products'
            })
                .then(function successCallback(response) {
                    $scope.products = response.data;
                }, function errorCallback(error) {
                    console.log(error);
                });

            $scope.getDeliveryTypes = function() {
                $http({
                    method: 'GET',
                    url: '/delivery'
                })
                    .then(function successCallback(response) {
                        $scope.deliverance = response.data;
                    }, function errorCallback(error) {
                        console.log(error);
                    });

            };

            $http({
                method: 'GET',
                url: '/shop/details/public'
            })
                .then(function successCallback(response) {
                    document.title = response.data.name;
                    $scope.shopName = response.data.name;
                    $scope.startTime = new Date(response.data.startTime);
                    $scope.startHour = ($scope.startTime.getHours()<10?'0':'') + $scope.startTime.getHours();
                    $scope.startMinute = ($scope.startTime.getMinutes()<10?'0':'') + $scope.startTime.getMinutes();
                    $scope.endTime = new Date(response.data.endTime);
                    $scope.endHour = ($scope.endTime.getHours()<10?'0':'') + $scope.endTime.getHours();
                    $scope.endMinute = ($scope.endTime.getMinutes()<10?'0':'') + $scope.endTime.getMinutes();

                }, function errorCallback(error) {
                    console.log(error);
                });

            // $scope.init = function() {
            //     var placeSearch, autocomplete;
            //     var componentForm = {
            //         street_number: 'short_name',
            //         route: 'long_name',
            //         locality: 'long_name',
            //         administrative_area_level_1: 'short_name',
            //         country: 'long_name',
            //         postal_code: 'short_name'
            //     };
            //
            //     function geolocate() {
            //         if (navigator.geolocation) {
            //             navigator.geolocation.getCurrentPosition(function(position) {
            //                 var geolocation = {
            //                     lat: position.coords.latitude,
            //                     lng: position.coords.longitude
            //                 };
            //                 var circle = new google.maps.Circle({
            //                     center: geolocation,
            //                     radius: position.coords.accuracy
            //                 });
            //                 autocomplete.setBounds(circle.getBounds());
            //             });
            //         }
            //     }
            // };

            $scope.delivery = function () {
                if ($scope.delivery.radio === 'NOVAPOSHTA') {
                    $scope.isAddressRequired = false;
                }
                 if ($scope.delivery.radio === 'COURIER') {
                     $scope.isAddressRequired = true;
                    if($scope.total < $scope.minOrderForFreeDelivery){
                        return ' + 40';
                    } else {
                        return '';
                    }
                } else if ($scope.delivery.radio === 'SELFTAKE'){
                     $scope.isAddressRequired = false;
                    return '';
                }
                
                return '';
            };

            function loadOptions() {
                $scope.selectedItems = shared.getSelectedItems();
                $scope.totalItems = shared.getTotalItems();
            }

            loadOptions();

            $scope.buyStart = function (index, $event) {

                var today = new Date();

                var startMinutes = $scope.startTime.getHours() * 60 + $scope.startTime.getMinutes();
                var endMinutes = $scope.endTime.getHours() * 60 + $scope.endTime.getMinutes();
                var nowMinutes = today.getHours() * 60 + today.getMinutes();

                var isNotWorkingTime = nowMinutes < startMinutes || nowMinutes >= endMinutes;

                if(isNotWorkingTime) {
                    toastr.warning('Ми працюємо з ' + $scope.startHour + '-' + $scope.startMinute + ' до ' + $scope.endHour + '-' + $scope.endMinute);
                } else {
                    if ($scope.selectedItems.indexOf($scope.products[index]) == -1) {
                        $scope.products[index].quantity = 1;
                        $scope.selectedItems.push($scope.products[index]);
                        shared.setSelectedItems($scope.selectedItems);
                        $scope.calculateTotal();

                    } else {
                        $scope.products[index].quantity ++;
                        shared.setSelectedItems($scope.selectedItems);
                        $scope.calculateTotal();
                    }
                    if ($event.stopPropagation) $event.stopPropagation();
                    if ($event.preventDefault) $event.preventDefault();
                    $event.cancelBubble = true;
                    $event.returnValue = false;

                    $scope.totalItems = 0;
                    $scope.selectedItems.forEach(function(selectedItem, key, array) {
                        $scope.totalItems += selectedItem.quantity;

                    });

                }

                $('input:radio[name=deliverance]:not(:disabled):first').click();
            };

            $scope.removeSelectedItem = function (index){
                $scope.selectedItems.splice(index, 1);
                $scope.calculateTotal();
                shared.setSelectedItems($scope.selectedItems);
                
            };

            $scope.removeAll = function () {
                $scope.selectedItems.length = 0;
                $scope.calculateTotal();
                shared.setSelectedItems($scope.selectedItems);

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

            $scope.makeOrder = function (){


                $scope.loading = true;

                var params = {
                    deliveryType: $scope.delivery.radio,
                    phone: new String(document.getElementById('phone').value),
                    name: document.getElementById('name').value,
                    address: document.getElementById('address').value,
                    newPostDepartment: $scope.delivery.newPost,
                    selectedItems: $scope.selectedItems
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

            function equalizeHeights(selector) {
                var heights = new Array();

                $(selector).each(function() {

                    $(this).css('min-height', '0');
                    $(this).css('max-height', 'none');
                    $(this).css('height', 'auto');

                    heights.push($(this).height());
                });

                var max = Math.max.apply( Math, heights );

                $(selector).each(function() {
                    $(this).css('height', max + 'px');
                });
            }

            $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
                equalizeHeights(".fixed-height");

                $(window).resize(function() {

                    setTimeout(function() {
                        equalizeHeights(".fixed-height");
                    }, 120);
                });
            });

            $scope.payOrder = function () {
                $("#paymentButton").click(function(e) {
                    var rootDiv = document.querySelector('.proceedWithPayment');
                    rootDiv.firstChild.submit();
                });
            };

            $scope.payLater = function () {
                $http({
                    method: 'PUT',
                    url: '/order/' + $scope.currentOrderUuid + '/manually-payed',
                    headers: {
                        'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                        'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                    }
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
            }
           
        }]);
    

})();



function encodeQueryData(data)
{
    var ret = [];
    for (var d in data)
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
}



