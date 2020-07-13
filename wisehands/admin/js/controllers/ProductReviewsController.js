angular.module('WiseHands')
  .controller('ProductReviewsController', ['$http', '$scope', '$routeParams', '$window', function ($http, $scope, $routeParams, $window) {
    $scope.loading = true;

    $http({
      method: 'GET',
      url: '/shop/details'
    })
      .then(response => {
        $scope.shop = response.data;
        $scope.loading = false;
      }, () => $scope.loading = false);

    $scope.getUrl = function () {
      $window.location.href = `/product/${$routeParams.uuid}`;
    };

    $scope.goBack = () => {
      window.history.back();
    };


    $http({
      method: 'GET',
      url: `/api/product/${$routeParams.uuid}`
    })
      .then(response => {
        const product = response.data;
              console.log(product);

        parseProductData(product);
        const activeShop = localStorage.getItem('activeShop');
        const mainImageIndex = $scope.product.images.findIndex(item => item.uuid === product.mainImage.uuid);
        $scope.productImageUrl = `public/product_images/${activeShop}/${product.images[mainImageIndex].filename}`;
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

    $scope.sortByProperty = 'feedbackTime';
    $scope.reverse = true;
    $scope.sortBy = sortByProperty => {
      $scope.reverse = ($scope.sortByProperty === sortByProperty) ? !$scope.reverse : false;
      $scope.sortByProperty = sortByProperty;
    };

    $scope.showOrHideFeedback = event => {
      const review = event.review;
      const url = review.showReview ? `/api/feedback/hide/${review.uuid}` : `/api/feedback/show/${review.uuid}`;
      sendParamsToFeedbackAPI(url, review);
    };

    $scope.setFeedbackItemContext = event => $scope.clickedFeedbackItem = event;

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
      }).then(response => review.showReview = response.data.showReview)
    }

  }]);
