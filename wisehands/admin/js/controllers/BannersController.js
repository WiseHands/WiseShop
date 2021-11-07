
angular.module('WiseHands')
  .controller('BannersController', ['$scope', '$http', 'signout', 'sideNavInit', '$window', function ($scope, $http, signout, sideNavInit, $window) {
    $scope.loading = true;
    const activeShop = localStorage.getItem('activeShop');

    $http({
      method: 'GET',
      url: '/api/banners',
    })
      .then(response => {
        $scope.loading = false;
        $scope.banner = response.data;
        console.log('/api/banners response', response.data)

      }, error => {
        $scope.loading = false;
        console.log(error);
      });



    $scope.setBanner = () => {
      $scope.loading = true;
        console.log('updateBanners => ', $scope.banner);

      $http({
        method: 'PUT',
        url: '/api/banners',
        data: $scope.banner
      })
        .success(response => {
          $scope.loading = false;
          showInfoMsg("SAVED");
        }).error(error => {
        $scope.loading = false;
        showWarningMsg("ERROR");
      });
    };



    sideNavInit.sideNav();
  }]);
