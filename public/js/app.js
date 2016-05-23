/**
 * Created by Reverie on 04/28/2016.
 */
function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete((document.getElementById('address')), {types: ['geocode']});
}
(function(){
    angular.module('sweety', [])
        .controller('ListViewController', function($scope, $http) {
            $scope.minOrderForFreeDelivery = 501;
            var prefix = 'public/images/shop';
            $scope.products = [
                {
                    productId: 1,
                    image: prefix + '/item0.jpg',
                    title: 'Шоколадки з передбаченнями «ТОРБА ЩАСТЯ»',
                    price: '60 грн',
                    priceNum: 60

                },
                {
                    productId: 2,
                    image: prefix + '/item1.jpg',
                    title: 'Шоколадка з передбаченням',
                    price: '7 грн/шт',
                    priceNum: 7

                },
                {
                    productId: 3,
                    image: prefix + '/item2.jpg',
                    title: 'Набір шоколадок "7 сторін моєї любові"',
                    price: '50 грн/шт',
                    priceNum: 50

                },
                {
                    productId: 4,
                    image: prefix + '/item3.jpg',
                    title: 'Набір шоколадок "7 сторін Любові"',
                    price: '50 грн/шт',
                    priceNum: 50

                },
                {
                    productId: 5,
                    image: prefix + '/item4.jpg',
                    title: 'Набір шоколадок "БУДДА"',
                    price: '50 грн/шт',
                    priceNum: 50

                },
                {
                    productId: 6,
                    image: prefix + '/item5.jpg',
                    title: 'Набір шоколадок "DRUZI"',
                    price: '50 грн/шт',
                    priceNum: 50

                },
                {
                    productId: 7,
                    image: prefix + '/item6.jpg',
                    title: 'Набір шоколадок "Маленький принц"',
                    price: '50 грн/шт',
                    priceNum: 50

                },
                {
                    productId: 8,
                    image: prefix + '/item7.jpg',
                    title: 'Набір шоколадок «Мафія»',
                    price: '50 грн/шт',
                    priceNum: 50

                },
                {
                    productId: 9,
                    image: prefix + '/item8.jpg',
                    title: 'Печиво з передбаченням',
                    price: '6 грн/шт',
                    priceNum: 6

                },
                {
                    productId: 10,
                    image: prefix + '/item9.jpg',
                    title: 'ІМБИРКИ ЗІ ЛЬВОВА - печиво з передбаченнями',
                    price: '50 грн',
                    priceNum: 50

                }

            ];

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
                } else if ($scope.delivery.radio == 'SELFTAKE'){
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
                    $scope.total += (item.quantity * item.priceNum);
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
                    url: '/pay',
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

