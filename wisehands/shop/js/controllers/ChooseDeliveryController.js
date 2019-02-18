(function(){
    angular.module('WiseShop')
        .controller('ChooseDeliveryController', ['$scope', '$http', 'shared',
            function($scope, $http, shared) {

                $scope.goToRoute = function() {

                  var deliveryType;
                  if (document.getElementById('radio1').checked) {
                      deliveryType = document.getElementById('radio1').value;
                  } else if (document.getElementById('radio2').checked) {
                      deliveryType = document.getElementById('radio2').value;
                  } else if(document.getElementById('radio3').checked) {
                      deliveryType = document.getElementById('radio3').value;
                  }

                  if (deliveryType == 'COURIER') {
                    console.log($scope.deliverance)
                    location.hash = '#!/selectedcourierdelivery'
                  } else if (deliveryType == 'NOVAPOSHTA') {
                    console.log($scope.deliverance)
                    location.hash = '#!/selectedpostdelivery'
                  } else {
                    console.log($scope.deliverance)
                    location.hash = '#!/selectedselftakedelivery'
                  }


                }

                $scope.newPostDelivery = localStorage.getItem('newPostDelivery') || '';

                function loadOptions() {
                    $scope.selectedItems = shared.getProductsToBuy();
                    $scope.total =  shared.getTotal();
                }
                loadOptions();

                $http({
                    method: 'GET',
                    url: '/delivery'
                })
                    .then(function successCallback(response) {
                        $scope.deliverance = response.data;
                        console.log($scope.deliverance);
                        $scope.minOrderForFreeDelivery = $scope.deliverance.courierFreeDeliveryLimit;
                        if ($scope.deliverance.isCourierAvailable){
                            $("#radio1").click();
                        } else if ($scope.deliverance.isNewPostAvailable){
                            $("#radio2").click();
                        } else if ($scope.deliverance.isSelfTakeAvailable){
                            $("#radio3").click();
                        }
                    }, function errorCallback(error) {
                        console.log(error);
                    });



            }]);
})();
