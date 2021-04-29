
angular.module('WiseHands')
  .controller('BannersController', ['$scope', '$http', 'signout', 'sideNavInit', '$window', function ($scope, $http, signout, sideNavInit, $window) {
    $scope.loading = true;
    const activeShop = localStorage.getItem('activeShop');

    $http({
      method: 'GET',
      url: '/shop/details',
    })
      .then(response => {
        $scope.loading = false;
        console.log('response', response)

      }, error => {
        $scope.loading = false;
        console.log(error);
      });



    $scope.updateBanners = () => {
      $scope.loading = true;
        console.log('updateBanners => ', $scope.banner);

      //      $http({
//        method: 'PUT',
//        url: '/visualsettings',
//        data: $scope.shopStyling
//      })
//        .success(response => {
//          $scope.loading = false;
//          $scope.shopStyling = response;
//          showInfoMsg("SAVED");
//        }).error(error => {
//        $scope.loading = false;
//        console.log(error);
//        showWarningMsg("ERROR");
//      });
    };



    sideNavInit.sideNav();
  }]);
