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
      console.log("showFeedback", item.order);
      /api/feedback/hide/${review.uuid}
    };

    $scope.removeFeedback = (event) => {
      console.log("removeFeedback", event.order);
      bodyParams = {
        uuid : event.order.uuid,
        isFeedbackDeleted : true
      }
      $http({
        method: 'DELETE',
        url: `/api/feedback/delete/${event.order.uuid}`,
        data: bodyParams
      }).then(response => {
        const data = response.data;
        const clickedItem = $scope.product.feedbackList.find(item => item.uuid === data.uuid);
        clickedItem.showReview = data.showReview;
      })
    }



    sideNavInit.sideNav();
}]);
