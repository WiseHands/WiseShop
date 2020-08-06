angular.module('WiseHands')
  .controller('FeedbackListController', ['$http', '$scope', '$routeParams', '$window', function ($http, $scope, $routeParams, $window) {
    $scope.loading = true;

    $scope.goBack = () => {
      window.history.back();
    };


    $http({
      method: 'GET',
      url: `/sudo/orders`
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
          item.time = moment(item.time).format('DD MMM YYYY HH:mm');
          return item;
       })
      $scope.orderList = orderList;
    }

    $scope.sortByProperty = 'time';
    $scope.reverse = true;
    $scope.sortBy = (sortByProperty) => {
      $scope.reverse = ($scope.sortByProperty === sortByProperty) ? !$scope.reverse : false;
      $scope.sortByProperty = sortByProperty;
    };

}]);
