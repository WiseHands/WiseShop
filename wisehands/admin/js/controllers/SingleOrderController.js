angular.module('WiseHands')
  .controller('SingleOrderController', ['$http', '$scope', '$routeParams',
    function ($http, $scope, $routeParams) {
      $scope.loading = true;
      const parser = new UAParser();

      $http({
        method: 'GET',
        url: `/order/${$routeParams.uuid}`,
      })
        .then(response => {
            $scope.loading = false;
            const data = response.data;
            $scope.address = `вул. ${data.clientAddressStreetName}, буд. ${data.clientAddressBuildingNumber}`;
            const uastring = data.userAgent;
            parser.setUA(uastring);
            const result = parser.getResult();
            $scope.userAgent = `${result.browser.name} ${result.os.name} ${result.os.version}`;
            $scope.order = response.data;
            const date = new Date($scope.order.time);
            const ddyymm = new Date($scope.order.time).toISOString().slice(0, 10);
            const hour = (date.getHours() < 10 ? '0' : '') + date.getHours();
            const minute = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
            $scope.properDate = `${ddyymm} ${hour}:${minute}`;

          }, () => $scope.loading = false
        );

      $scope.hideModal = () => {
        $('#deleteOrder').modal('hide');
        $('#feedbackToOrder').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
      };

      $scope.deleteButton = true;

      $scope.deleteOrder = () => {
        $scope.deleteButton = false;
        $scope.modalSpinner = true;
        $http({
          method: 'DELETE',
          url: `/order/${$routeParams.uuid}`,
        })
          .then(() => {
            $scope.modalSpinner = false;
            $scope.succesfullDelete = true;
          }, error => {
            $scope.modalSpinner = false;
            console.log(error);
          });
      };

      $scope.cancelOrder = () => {
        $scope.loading = true;
        $http({
          method: 'PUT',
          url: `/order/${$routeParams.uuid}/cancelled`,
        })
          .then(response => {
            $scope.loading = false;
            $scope.order = response.data;
          }, error => {
            $scope.loading = false;
            console.log(error);
          });
      };

      $scope.shipOrder = () => {
        $scope.loading = true;
        $http({
          method: 'PUT',
          url: `/order/${$routeParams.uuid}/shipped`,
        })
          .then(response => {
            $scope.loading = false;
            $scope.order = response.data;
          }, error => {
            $scope.loading = false;
            console.log(error);
          });
      };

      $scope.requestOrderFeedback = () => {
        $scope.loading = true;
        $scope.errorFeedback = false;
        $scope.successfulFeedback = false;
        $scope.modalSpinner = true;
        $http({
          method: 'PUT',
          url: `/order/${$routeParams.uuid}/feedback`
        })
          .then(response => {
            $scope.loading = false;
            $scope.modalSpinner = false;
            if (response.data.status === 420) {
              $scope.errorFeedback = false;
              $scope.successfulFeedback = true;
            }
            if (response.data.status === 419) {
              $scope.errorFeedback = true;
              $scope.successfulFeedback = false;
            }
          }, error => {
            $scope.loading = false;
            $scope.modalSpinner = false;
            console.log(error);
          });
      };

      $scope.goBack = () => {
        window.history.back();
      }
    }]);
