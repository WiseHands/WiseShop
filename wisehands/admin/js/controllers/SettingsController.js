angular.module('WiseHands')
  .controller('SettingsController', ['$scope', '$http', 'signout', 'sideNavInit', function ($scope, $http, signout, sideNavInit) {
    $scope.loading = true;

    $http({
      method: 'GET',
      url: '/shop/details',
    })
      .then(response => {
        $scope.loading = false;
        $scope.shopStyling = response.data.visualSettingsDTO;
        $scope.activeShop = localStorage.getItem('activeShop');
        const isLogoEmpty = $scope.shopStyling.shopLogo === '' || !$scope.shopStyling.shopLogo;
        $scope.logo = isLogoEmpty ? '' : `public/shop_logo/${$scope.activeShop}/${$scope.shopStyling.shopLogo}`;
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
      $('#favIconLoader')[0].value = '';
      $('#favIconLoader').click();
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

    $scope.favIconUpload = event => {
      $scope.$apply(() => {
        $scope.loading = true;
      });
      const file = event.files[0];
      const reader = new FileReader();
      reader.onloadend = $scope.faviconIsLoaded;
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

    $scope.addFavicon = () => {
      const faviconFd = new FormData();
      faviconFd.append('favicon', $scope.faviconBlob);
      $http.put('/visualsettings/favicon', faviconFd, {
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined,
        }
      })
        .success(response => {
          $scope.shopStyling = response;
          const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
          link.type = 'image/x-icon';
          link.rel = 'shortcut icon';
          link.href = `public/shop_logo/${$scope.activeShop}/${response.shopFavicon}`;
          document.getElementsByTagName('head')[0].appendChild(link);
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

    $scope.faviconIsLoaded = event => {
      $scope.$apply(() => {
        $scope.favicon = event.target.result;
        $scope.faviconBlob = dataURItoBlob($scope.favicon);
        $scope.addFavicon();
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

    $scope.deleteFavicon = () => {
      $scope.loading = true;
      $http({
        method: 'DELETE',
        url: '/visualsettings/favicon',
      })
        .then(response => {
          $scope.shopStyling = response.data;
          const head = document.getElementsByTagName('head')[0];
          const linkIcon = document.querySelector("link[rel*='icon']");
          head.removeChild(linkIcon);
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
