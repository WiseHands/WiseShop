angular.module('WiseHands')
  .controller('SettingsController', ['$scope', '$http', 'signout', 'sideNavInit', function ($scope, $http, signout, sideNavInit) {
    $scope.loading = true;
    const activeShop = localStorage.getItem('activeShop');

    $http({
      method: 'GET',
      url: '/shop/details',
    })
      .then(response => {
        $scope.loading = false;
        $scope.shopStyling = response.data.visualSettingsDTO;
        setFaviconSrc($scope.shopStyling.shopFavicon);
      }, error => {
        $scope.loading = false;
        console.log(error);
      });

    $scope.updateShopStyling = () => {
      $scope.loading = true;
      $http({
        method: 'PUT',
        url: '/visualsettings',
        data: $scope.shopStyling
      })
        .success(response => {
          $scope.loading = false;
          $scope.shopStyling = response;
          showInfoMsg("SAVED");
        }).error(error => {
        $scope.loading = false;
        console.log(error);
        showWarningMsg("ERROR");
      });
    };

    $scope.loadImage = () => {
      $('#imageLoader')[0].value = '';
      $('#imageLoader').click();
    };

    $scope.loadFavicon = () => {
      const favIconLoader = $('#favIconLoader');
      favIconLoader[0].value = '';
      favIconLoader.click();
    };

    $scope.imageUpload = event => {
      $scope.$apply(() => {
        $scope.loading = true;
      });
      const file = event.files[0];
      const reader = new FileReader();
      reader.onloadend = $scope.imageIsLoaded;
      if (file && file.type.match('image.*')) {
        reader.readAsDataURL(event.files[0]);
      } else {
        $scope.$apply(() => {
          $scope.loading = false;
        });
      }
    };

    $scope.addLogo = () => {
      const logoFd = new FormData();
      logoFd.append('logo', $scope.logoBlob);
      $http.put('/visualsettings/logo', logoFd, {
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined,
        }
      })
        .success(() => {
          $scope.loading = false;
        })
        .error(error => {
          $scope.loading = false;
          console.log(error);
        });
    };

    $scope.imageIsLoaded = event => {
      $scope.$apply(() => {
        $scope.logo = event.target.result;
        $scope.logoBlob = dataURItoBlob($scope.logo);
        $scope.addLogo();
        $scope.loading = false;
      });
    };

    $scope.deleteLogo = () => {
      $scope.loading = true;
      $http({
        method: 'DELETE',
        url: '/visualsettings/logo',
      })
        .then(() => {
          $scope.logo = '';
          $scope.loading = false;
        }, error => {
          $scope.loading = false;
          console.log(error);
        });
    };

    function setFaviconSrc(favicon) {
      $scope.faviconSrc = favicon ? `/public/shop_logo/${activeShop}/${favicon}` : '';
    }

    $scope.favIconUpload = event => {
      $scope.loading = true;
      const file = event.files[0];
      const reader = new FileReader();
      reader.onloadend = addFavicon;
      if (file && file.type.match('image.*')) {
        reader.readAsDataURL(file);
      } else {
        $scope.loading = false;
      }
    };

    function addFavicon(event) {
      const faviconBlob = dataURItoBlob(event.target.result);
      const faviconFd = new FormData();
      faviconFd.append('favicon', faviconBlob);
      $http.put('/visualsettings/favicon', faviconFd, {
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined,
        }
      })
        .success(response => {
          $scope.shopStyling = response;
          setFaviconSrc($scope.shopStyling.shopFavicon);
          $scope.loading = false;
        })
        .error(error => {
          $scope.loading = false;
          console.log(error);
        });
    }

    $scope.deleteFavicon = () => {
      $scope.loading = true;
      $http({
        method: 'DELETE',
        url: '/visualsettings/favicon',
      })
        .then(response => {
          $scope.shopStyling = response.data;
          $scope.faviconSrc = '';
          $scope.loading = false;
        }, error => {
          $scope.loading = false;
          console.log(error);
        });
    };

    function showWarningMsg(msg) {
      toastr.clear();
      toastr.options = {
        "positionClass": "toast-bottom-right",
        "preventDuplicates": true
      };
      toastr.warning(msg);
    }

    function showInfoMsg(msg) {
      toastr.clear();
      toastr.options = {
        "positionClass": "toast-bottom-right",
        "preventDuplicates": true
      };
      toastr.info(msg);
    }

    function dataURItoBlob(dataURI) {
      const binary = atob(dataURI.split(',')[1]);
      const array = [];
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
    }

    sideNavInit.sideNav();
  }]);
