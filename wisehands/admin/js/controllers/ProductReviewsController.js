angular.module('WiseHands')
  .controller('ProductReviewsController', ['$http', '$scope', '$routeParams', function ($http, $scope, $routeParams) {
    $scope.loading = true;

      $http({
          method: 'GET',
          url: '/shop/details'
      })
          .then(function successCallback(response) {
              $scope.shop = response.data;
              $scope.loading = false;
          }, function errorCallback(response) {
              $scope.loading = false;
          });

      $http({
      method: 'GET',
      url: `/api/product/${$routeParams.uuid}`
    })
      .then(response => {
        const product = response.data;
        parseProductData(product);
        $scope.activeShop = localStorage.getItem('activeShop');
        $scope.selected = $scope.product.images.findIndex(item => item.uuid === product.mainImage.uuid);
        $scope.loading = false;
      }, error => {
        $scope.loading = false;
        console.log(error);
      });

    function parseProductData(product) {
      product.feedbackList.map(item => {
        item.parsedFeedbackTime = moment(item.feedbackTime).format('DD MMMM YYYY HH:mm:ss');
        return item;
      });
      $scope.product = product;
    }

      $scope.propertyName = 'feedbackTime';
      $scope.reverse = true;
      $scope.sortBy = function(propertyName) {
          $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
          $scope.propertyName = propertyName;
      };

    $scope.showOrHideFeedback = event => {
      const review = event.review;
      const url = review.showReview ? `/api/feedback/hide/${review.uuid}` : `/api/feedback/show/${review.uuid}`;
      sendParamsToFeedbackAPI(url, review);
    };

    $scope.setFeedbackItemContext = event => {
      $scope.clickedFeedbackItem = event;
    };

    $scope.saveComment = () => {
      $('#sendReply').modal('hide');
      const review = $scope.clickedFeedbackItem.review;
      const uuid = review.uuid;
      const customerName = review.customerName;
      const customerMail = review.customerMail;
      const comment = review.feedbackComment.comment || '';
      const bodyParams = {
        feedbackUuid: uuid,
        comment: comment,
        productUuid: $routeParams.uuid,
        customerName: customerName,
        customerMail: customerMail
      };
      const url = `/api/comment/save`;
      sendParamsToCommentFeedbackAPI(url, bodyParams);
    };

    function sendParamsToCommentFeedbackAPI(url, bodyParams) {
      $http({
        method: 'POST',
        url: url,
        data: bodyParams
      }).then(response => {
        const data = response.data;
        const clickedItem = $scope.product.feedbackList.find(item => item.uuid === data.uuid);
        clickedItem.showReview = data.showReview;
      })
    }

    function sendParamsToFeedbackAPI(url, review) {
      $http({
        method: 'PUT',
        url: url
      }).then(() => review.showReview = !review.showReview)
    }

  }]);
