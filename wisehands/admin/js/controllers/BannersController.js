
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
        // $scope.banner = response.data;
        console.log('/api/banners response', response.data)

      }, error => {
        $scope.loading = false;
        console.log(error);
      });



    $scope.setBannerForProductOfDay = () => {
      $scope.loading = true;
        console.log('updateBanners => ', $scope.bannerProductOfDay);
      $http({
        method: 'PUT',
        url: '/api/banner/for/product',
        data: $scope.bannerProductOfDay
      })
        .success(response => {
          $scope.loading = false;
          showInfoMsg("SAVED");
        }).error(error => {
        $scope.loading = false;
        showWarningMsg("ERROR");
      });
    };

    $scope.setBannerForShopBasket = () => {
      $scope.loading = true;
        console.log('updateBanners => ', $scope.bannerForShopBasket);
      $http({
        method: 'PUT',
        url: '/api/banner/in/basket',
        data: $scope.bannerForShopBasket
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
