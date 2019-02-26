(function(){
    angular.module('WiseShop')
        .controller('ChooseDeliveryController', ['$scope', '$http', 'shared', '$route',
            function($scope, $http, shared, $route) {

              $http({
                  method: 'GET',
                  url: '/courier/polygon'
              })
                  .then(function successCallback(response) {
                    if(!response.data) {
                      $scope.courierPolygonData = true;
                      console.log("loadPolygons response", response);
                    }
                      console.log("loadPolygons response", $scope.courierPolygonData);
                  }, function errorCallback(data) {
                      $scope.status = 'Щось пішло не так... з координатами ';
                  });

                  function isEmpty(obj) {
                      for(var key in obj) {
                          if(obj.hasOwnProperty(key))
                              return false;
                      }
                      return true;
                  }

                $scope.goToRoute = function() {

                  var deliveryType;
                  if (document.getElementById('radio1').checked) {
                      deliveryType = document.getElementById('radio1').value;
                  } else if (document.getElementById('radio2').checked) {
                      deliveryType = document.getElementById('radio2').value;
                  } else if(document.getElementById('radio3').checked) {
                      deliveryType = document.getElementById('radio3').value;
                  }

                  if (deliveryType == 'COURIER' && $scope.courierPolygonData == true) {
                    location.hash = '#!/selectedcourierdelivery';
                    console.log($scope.deliverance);
                  } else if (deliveryType == 'COURIER') {
                    console.log($scope.deliverance);
                    location.hash = '#!/selectedaddressdelivery'
                  }else if (deliveryType == 'NOVAPOSHTA') {
                    console.log($scope.deliverance);
                    location.hash = '#!/selectedpostdelivery';
                  } else {
                    console.log($scope.deliverance);
                    location.hash = '#!/selectedselftakedelivery';
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
