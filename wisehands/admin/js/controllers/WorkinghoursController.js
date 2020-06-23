angular.module('WiseHands')
  .controller('WorkinghoursController', ['$scope', '$http', 'sideNavInit',
    function ($scope, $http, sideNavInit) {
      $scope.loading = true;

      $http({
        method: 'GET',
        url: '/shop/details'
      }).then(response => {
          $scope.activeShop = response.data;
          $scope.loading = false;
        }, () => $scope.loading = false
      );

      $http({
        method: 'GET',
        url: '/shop/details/public'
      }).then(response => {
          $scope.workDay = response.data;
          $scope.loading = false;
        }, () => $scope.loading = false
      );

      $scope.validateTimeInput = event => validate(event.currentTarget);

      function validate(input) {
        const isValid = moment(input.value, 'HH:mm', true).isValid();
        const errorMessageContainer = input.nextElementSibling;
        errorMessageContainer.hidden = isValid;
        return isValid;
      }

      $scope.updateShopWorkingState = () => {
        const isShopAlwaysOpenedOrCurrentlyClosed = $scope.activeShop.isTemporaryClosed || $scope.activeShop.alwaysOpen;
        if (!isShopAlwaysOpenedOrCurrentlyClosed && validateTimeInputs()) {
          updateWorkingHours();
          updateShopDetails();
        }
      };

      function validateTimeInputs() {
        const timeInputsContainer = document.querySelector('#inputTimeContainer');
        const timeInputs = timeInputsContainer.querySelectorAll('input[type="text"]:not([is-required="true"])');
        const validInputsCounter = [...timeInputs].reduce((accumulator, input) => {
          if (validate(input)) accumulator++;
          return accumulator;
        }, 0);
        return validInputsCounter === timeInputs.length;
      }

      function updateWorkingHours() {
        $scope.loading = true;
        $http({
          method: 'PUT',
          url: '/shop/update/working-hours',
          data: $scope.workDay
        })
          .then(() => {
            showInfoMessage("SAVED");
            $scope.loading = false;
          }, error => {
            showWarningMessage("ERROR");
            $scope.loading = false;
            console.log(error);
          });
      }

      function updateShopDetails() {
        $scope.loading = true;
        $http({
          method: 'PUT',
          url: '/shop',
          data: $scope.activeShop
        })
          .then(() => {
            showInfoMessage("SAVED");
            $scope.loading = false;
          }, error => {
            $scope.loading = false;
            showWarningMessage("UNKNOWN ERROR");
            console.log(error);
          });
      }

      sideNavInit.sideNav();

      function showWarningMessage(message) {
        toastr.clear();
        toastr.options = {
          positionClass: 'toast-bottom-right',
          preventDuplicates: true
        };
        toastr.warning(message);
      }

      function showInfoMessage(message) {
        toastr.clear();
        toastr.options = {
          positionClass: 'toast-bottom-right',
          preventDuplicates: true
        };
        toastr.info(message);
      }
    }]);
