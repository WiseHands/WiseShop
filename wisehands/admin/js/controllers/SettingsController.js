
angular.module('WiseHands')
  .controller('SettingsController', ['$scope', '$http', 'signout', 'sideNavInit', '$window', function ($scope, $http, signout, sideNavInit, $window) {
    $scope.loading = true;
    const activeShop = localStorage.getItem('activeShop');

    $http({
      method: 'GET',
      url: '/shop/details',
    })
      .then(response => {
        $scope.loading = false;
        $scope.shopUuid = response.data.uuid;
        $scope.shopStyling = response.data.visualSettingsDTO;
        setFaviconSrc($scope.shopStyling.shopFavicon);
        setLogoSrc($scope.shopStyling.shopLogo);
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

    $scope.redirectToTranslationForShopName = () => {
        $http({
            method: 'GET',
            url: `/api/get/translation/shop/name/${$scope.shopUuid}`
        })
            .then((successCallback) => {
                const translation = successCallback.data;
                $window.location.href = `#/translation/${$scope.shopUuid}/${translation.uuid}`;
            }, (errorCallback) =>{
                $scope.loading = false;
                console.log(error);
            });

    }

    function setLogoSrc(logoSrc) {
      $scope.logoSrc = logoSrc ? `/public/shop_logo/${activeShop}/${logoSrc}` : '';
    }

    $scope.loadLogo = () => {
      const logoLoader = $('#logoLoader');
      logoLoader[0].value = '';
      logoLoader.click();
    };

    $scope.logoUpload = event => {
      $scope.loading = true;
      const file = event.files[0];
      const reader = new FileReader();
      reader.onloadend = addLogo;
      if (file && file.type.match('image.*')) {
        reader.readAsDataURL(event.files[0]);
      } else {
        $scope.loading = false;
      }
    };

    function addLogo(event) {
      const logo = event.target.result;
      const logoBlob = dataURItoBlob(logo);
      const logoFd = new FormData();
      logoFd.append('logo', logoBlob);
      $http.put('/visualsettings/logo', logoFd, {
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined,
        }
      })
        .success(response => {
          setLogoSrc(response);
          $scope.loading = false;
        })
        .error(error => {
          $scope.loading = false;
          console.log(error);
        });
    }

    $scope.deleteLogo = () => {
      $scope.loading = true;
      $http({
        method: 'DELETE',
        url: '/visualsettings/logo',
      })
        .then(() => {
          $scope.logoSrc = '';
          $scope.loading = false;
        }, error => {
          $scope.loading = false;
          console.log(error);
        });
    };

    function setFaviconSrc(favicon) {
      $scope.faviconSrc = favicon ? `/public/shop_logo/${activeShop}/${favicon}` : '';
    }

    $scope.loadFavicon = () => {
      const favIconLoader = $('#favIconLoader');
      favIconLoader[0].value = '';
      favIconLoader.click();
    };

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
          setFaviconSrc(response);
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
      [...binary].forEach((char, index) => array.push(binary.charCodeAt(index)));
      return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
    }

    sideNavInit.sideNav();
  }]);
