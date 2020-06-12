angular.module('WiseHands')
  .controller('ProductReviewsController', ['$http', '$scope', '$routeParams', function ($http, $scope, $routeParams) {
    $scope.loading = true;

    $http({
      method: 'GET',
      url: `/api/product/${$routeParams.uuid}`
    })
      .then(response => {
        const product = response.data;
        parseProductData(product);
        $scope.activeShop = localStorage.getItem('activeShop');
        $scope.selected = $scope.product.images.findIndex(item => item.uuid === $scope.product.mainImage.uuid);
        $scope.loading = false;
      }, error => {
        $scope.loading = false;
        console.log(error);
      });

    function parseProductData(product) {
      product.feedbackList.map(item => {
        item.feedbackTime = moment(item.feedbackTime).format('DD MMMM YYYY HH:mm:ss');
        return item;
      });
      $scope.product = product;
    }

    $scope.showOrHideFeedback = event => {
      const review = event.review;
      const url = review.showReview ? `/api/feedback/hide/${review.uuid}` : `/api/feedback/show/${review.uuid}`;
      sendParamsToFeedbackAPI(url, review);
    };

    $scope.saveComment = event => {
      const uuid = event.review.uuid;
      const comment = event.review.feedbackComment.comment;
      const bodyParams = {
        feedbackUuid: event.review.uuid,
        comment: comment
      };
      const url = `/api/comment/save`;
      console.log(bodyParams);
      sendParamsToCommentFeedbackAPI(url, bodyParams);
    };

    function sendParamsToCommentFeedbackAPI(url, bodyParams) {
      $http({
        method: 'POST',
        url: url,
        data: bodyParams
        }).then(response => console.log(response))
      }


    function sendParamsToFeedbackAPI(url, review) {
      $http({
        method: 'PUT',
        url: url
      }).then(() => review.showReview = !review.showReview)
    }
  }]);
