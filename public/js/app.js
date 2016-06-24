function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete((document.getElementById('address')), {types: ['geocode']});
}
(function(){
    angular.module('sweety', [])
        .controller('ListViewController', function($scope, $http) {
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


            $scope.init = function() {
                var placeSearch, autocomplete;
                var componentForm = {
                    street_number: 'short_name',
                    route: 'long_name',
                    locality: 'long_name',
                    administrative_area_level_1: 'short_name',
                    country: 'long_name',
                    postal_code: 'short_name'
                };

                function geolocate() {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function(position) {
                            var geolocation = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            };
                            var circle = new google.maps.Circle({
                                center: geolocation,
                                radius: position.coords.accuracy
                            });
                            autocomplete.setBounds(circle.getBounds());
                        });
                    }
                }
            };

            $scope.delivery = function () {
                 if ($scope.delivery.radio === 'COURIER') {
                    if($scope.total < $scope.minOrderForFreeDelivery){
                        return ' + 35';
                    } else {
                        return '';
                    }
                } else if ($scope.delivery.radio === 'SELFTAKE'){
                    return '';
                }
                return '';
            };

            $scope.selectedItems = [];
            $scope.leftSideView = "col-md-2 col-sm-4 col-xs-6";
            $scope.container = "col-md-12";
            $scope.showList = false;
            $scope.buyStart = function (index, $event) {
                if ($scope.leftSideView === "col-md-2 col-sm-4 col-xs-6") {
                    $scope.leftSideView = "col-md-3 col-sm-4 col-xs-6";
                    $scope.container = "col-md-6";
                    $scope.showList = true;
                }
                if ($scope.selectedItems.indexOf($scope.products[index]) == -1) {
                    $scope.products[index].quantity = 1;
                    $scope.selectedItems.push($scope.products[index]);
                    $scope.calculateTotal();

                } else {
                    $scope.products[index].quantity ++;
                    $scope.calculateTotal();
                }
                if ($event.stopPropagation) $event.stopPropagation();
                if ($event.preventDefault) $event.preventDefault();
                $event.cancelBubble = true;
                $event.returnValue = false;
            };

            $scope.removeSelectedItem = function (index){
                $scope.selectedItems.splice(index, 1);
                $scope.calculateTotal();
                if($scope.selectedItems.length == 0) {
                    $scope.leftSideView = "col-md-2 col-sm-4 col-xs-6";
                    $scope.container = "col-md-12";
                    $scope.showList = false;
                }
            };

            $scope.removeAll = function () {
                $scope.selectedItems.length = 0;
                $scope.leftSideView = "col-md-2 col-sm-4 col-xs-6";
                $scope.container = "col-md-12";
                $scope.showList = false;

            };

            $scope.calculateTotal = function(){
                $scope.total = 0;
                for(var i =0; i < $scope.selectedItems.length; i++){
                    var item = $scope.selectedItems[i];
                    $scope.total += (item.quantity * item.price);
                }
            };

            $scope.makeOrder = function (){
                var params = {
                    deliveryType: $scope.delivery.radio,
                    phone: new String($scope.phone),
                    name: $scope.name,
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
                    $scope.successfullResponse = true;
                    var modalContent = document.querySelector(".proceedWithPayment");
                    modalContent.innerHTML = response.data;
                    modalContent.firstChild.style.textAlign = 'center';

                    document.querySelector('.toPayment').style.display = 'none';
                }, function errorCallback(data) {
                    $scope.successfullResponse = false;

                    document.querySelector('.toPayment').style.display = 'block';
                });
            };


        });
    

})();

function encodeQueryData(data)
{
    var ret = [];
    for (var d in data)
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
}

