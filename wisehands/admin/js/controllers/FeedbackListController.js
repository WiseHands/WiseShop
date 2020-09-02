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

    $scope.modalForShowHideFeedback = event =>{
      $scope.deleteButton = false;
      $scope.orderUuid = event.order.uuid;
      $scope.orderFeedback = event.order.orderFeedback
      console.log(event);
      $scope.orderFeedback.showReview ? $scope.successfulHide = true : $scope.successfulShow = true;
      $('#removeFeedback').modal('show');
    };

    $scope.sendFeedbackForShowingOrHidingIt = () => {
      $scope.deleteButton = false;
      $scope.successfulShow = false;
      $scope.successfulHide = false;
      $scope.modalSpinner = true;

      const url = $scope.orderFeedback.showReview ? `/api/feedback/hide/all/${$scope.orderUuid}/false` : `/api/feedback/show/all/${$scope.orderUuid}/false`;
      $http({
        method: 'PUT',
        url: url,
        data: {showReview: $scope.orderFeedback.showReview}
      }).then(response => {
        console.log('response sendFeedbackForShowingOrHidingIt', response.data);
        showingHidingAnimation(response.data);
        $scope.modalSpinner = false;
        $('#removeFeedback').modal('hide');
      });
    };

    showingHidingAnimation = (orderList) => {
      orderList.forEach(order => {
        if(order.uuid === $scope.orderUuid){
          $scope.orderFeedback.showReview = order.orderFeedback.showReview;
        }
      });
    };

    $scope.modalForRemoveFeedback = (event) => {
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
