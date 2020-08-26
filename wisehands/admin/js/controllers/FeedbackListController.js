angular.module('WiseHands')
  .controller('FeedbackListController', ['$http', '$scope', 'sideNavInit', '$routeParams', '$window', function ($http, $scope, sideNavInit, $routeParams, $window) {
    $scope.loading = true;

    $scope.goBack = () => {
      window.history.back();
    };


    $http({
      method: 'GET',
      url: `/api/feedback/orders`
    })
      .then(response => {
       $scope.loading = false;
       $scope.orderList = response.data;
       console.log($scope.orderList);
       parseOrderTime($scope.orderList);
    }, error => {
       $scope.loading = false;
       console.log(error);
    });

    parseOrderTime = (orderList) => {
       orderList.map(item => {
          if (item.orderFeedback) {
            item.orderFeedback.feedbackTime = moment(item.orderFeedback.feedbackTime).format('DD MMM YYYY HH:mm');
          }
          return item;
       })
      $scope.orderList = orderList;
    }

    $scope.sortByProperty = 'feedbackTime';
    $scope.reverse = true;
    $scope.sortBy = (sortByProperty) => {
      $scope.reverse = ($scope.sortByProperty === sortByProperty) ? !$scope.reverse : false;
      $scope.sortByProperty = sortByProperty;
    };

    $scope.showFeedback = (event) => {
      console.log("showFeedback", event.order);
      $http({
        method: 'PUT',
        url: `/api/feedback/show/all/${event.order.uuid}`
      }).then(response => {
        $scope.orderList = response.data;
      })
    };


    $scope.hideModal = () => {
      $('#removeFeedback').modal('hide');
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
    };

    $scope.modalForShowFeedback = (event) =>{
      console.log('removeFeedback', event);
      $scope.deleteButton = false;
      $scope.succesfullDelete = true;
      $('#removeFeedback').modal('show');
      $scope.showingUuid = event.order.uuid;
      console.log('showFeedback $scope.uuid = ', $scope.showingUuid);
    };

    $scope.showFeedback = () => {
      $scope.deleteButton = false;
      $scope.succesfullDelete = false;
      $scope.modalSpinner = true;
      $http({
        method: 'PUT',
        url: `/api/feedback/show/all/${$scope.showingUuid}`
      }).then(response => {
        $scope.orderList = response.data;
        $scope.modalSpinner = false;
        $('#removeFeedback').modal('hide');
      });
    }

    $scope.modalForRemoveFeedback = (event) =>{
      console.log('removeFeedback', event);
      $scope.deleteButton = true;
      $scope.succesfullDelete = false;
      $('#removeFeedback').modal('show');
      $scope.removeUuid = event.order.uuid;
      console.log('removeFeedback $scope.uuid = ', $scope.removeUuid);
    };


    $scope.removeFeedback = () => {
      $scope.deleteButton = false;
      $scope.modalSpinner = true;
      $http({
        method: 'DELETE',
        url: `/api/feedback/delete/${$scope.removeUuid}`
      }).then(response => {
        $scope.orderList = response.data;
        $scope.modalSpinner = false;
        $('#removeFeedback').modal('hide');
      });
    }


    sideNavInit.sideNav();
}]);
