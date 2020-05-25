angular.module('WiseHands')
  .controller('SelfTakeDeliverySettingsController', ['$scope', '$http', '$location', 'sideNavInit', function ($scope, $http, $location, sideNavInit) {
    $scope.loading = true;

    $http({
      method: 'GET',
      url: '/delivery',

    })
      .then(response => {
          $scope.loading = false;
          $scope.delivery = response.data;
        }, () => $scope.loading = false
      );


    $scope.setDeliveryOptions = () => {
      $scope.loading = true;
      $http({
        method: 'PUT',
        url: '/delivery',
        data: $scope.delivery,

      })
        .then(() => {
          $scope.loading = false;
          $location.path('/delivery');
          showInfoMessage("SAVED");
        }, error => {
          $scope.loading = false;
          console.log(error);
          showInfoMessage("ERROR");
        });

    };

    sideNavInit.sideNav();

    function showInfoMessage(msg) {
      toastr.clear();
      toastr.options = {
        "positionClass": "toast-bottom-right",
        "preventDuplicates": true
      };
      toastr.info(msg);
    }
  }]);
