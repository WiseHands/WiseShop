(function(){
  angular.module('WiseShop')
      .controller('PaymentTypeController', ['$scope', '$http', 'shared', '$route',
          function($scope, $http, shared, $route) {


              function loadOptions() {
                  $scope.selectedItems = shared.getProductsToBuy();
                  $scope.total =  shared.getTotal();
                  $scope.deliveryType = shared.getDeliveryType();
              }
              loadOptions();

              $scope.goToRoute = function() {

                var paymentType;

                if (document.getElementById('radio1').checked) {
                    paymentType = document.getElementById('radio1').value;
                } else if (document.getElementById('radio2').checked) {
                    paymentType = document.getElementById('radio2').value;
                }

                if (paymentType == 'CASHONSPOT') {
                  shared.setPaymentType(paymentType);
                    if ($scope.deliveryType == 'NOVAPOSHTA'){
                      location.hash = '#!/selectedpostdelivery';
                    } else if ($scope.deliveryType == 'SELFTAKE') {
                      location.hash = '#!/selectedselftakedelivery';
                    } else {
                      location.hash = '#!/selectedcourierdelivery';
                    }
                  console.log('paymentType', paymentType);
                } else if (paymentType == 'PAYONLINE') {
                  shared.setPaymentType(paymentType);
                      if ($scope.deliveryType == 'NOVAPOSHTA'){
                      location.hash = '#!/selectedpostdelivery';
                    } else if ($scope.deliveryType == 'SELFTAKE') {
                      location.hash = '#!/selectedselftakedelivery';
                    } else {
                      location.hash = '#!/selectedcourierdelivery';
                    }
                  console.log('paymentType', paymentType);
                }
              };



              $http({
                  method: 'GET',
                  url: '/delivery'
              })
                  .then(function successCallback(response) {
                      $scope.deliverance = response.data;
                      console.log('$scope.deliverance', $scope.deliverance);
                      $scope.minOrderForFreeDelivery = $scope.deliverance.courierFreeDeliveryLimit;
                      if ($scope.deliverance.isCourierAvailable){
                          $("#radio1").click();
                      } else if ($scope.deliverance.isNewPostAvailable){
                          $("#radio2").click();
                      }
                  }, function errorCallback(error) {
                      console.log(error);
                  });



          }]);
})();
