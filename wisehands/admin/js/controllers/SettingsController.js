
angular.module('WiseHands')
    .controller('SettingsController', ['$scope', '$http', '$location', 'sideNavInit', 'signout', 'shared', '$rootScope',
    		function ($scope, $http, $location, sideNavInit, signout, shared, $rootScope) {
        $scope.loading = true;

                $scope.hoursSetting = function () {
                    $location.path('/hourssetting');
                };

        $http({
            method: 'GET',
            url: '/balance'
        })
            .then(function successCallback(response) {
                $scope.balance = response.data;
                $scope.loading = false;
            }, function errorCallback(response) {
                $scope.loading = false;

            });

        $http({
            method: 'GET',
            url: '/shop/details'
        })
            .then(function successCallback(response) {
                $scope.activeShop = response.data;
                console.log('details value of checkbox whenClosed:', $scope.activeShop.isTemporaryClosed);
                // $scope.activeShop.startTime = new Date ($scope.activeShop.startTime);
                // $scope.activeShop.endTime = new Date ($scope.activeShop.endTime);
                $scope.loading = false;
            }, function errorCallback(response) {
                $scope.loading = false;
            });

        $scope.setAdditionSetting = function(){
            $location.path('/additionsettings');
        };


        $scope.whenShopClosed = function(){
              if ($scope.activeShop.isTemporaryClosed){
                console.log('$scope.activeShop.isTemporaryClosed', $scope.activeShop.isTemporaryClosed);
                $scope.activeShop.isTemporaryClosed = true;

              } else {
                console.log('$scope.activeShop.isTemporaryClosed', $scope.activeShop.isTemporaryClosed);
                $scope.activeShop.isTemporaryClosed = false;
              }
        };
        $scope.updateSettings = () => {
            $scope.updateShopStyling();
            $scope.updateStoreSettings();
        }

        $scope.updateShopStyling = function () {
            $scope.loading = true;
            $scope.shopStyling.sidebarColorScheme = $scope.selectedSkin;
            $http({
                method: 'PUT',
                url: '/visualsettings',
                data: $scope.shopStyling
            })
                .success(function (response) {
                    console.log("response for footer: ", response);
                    $scope.loading = false;
                    $scope.shopStyling = response;
                    $scope.navbarStyles.forEach(function(skin) {
                        if (skin.code === $scope.shopStyling.sidebarColorScheme.code){
                            $scope.selectedSkin = skin;
                        }
                    });
                    showInfoMsg("SAVED");
                }).
            error(function (response) {
                $scope.loading = false;
                console.log(response);
                showWarningMsg("ERROR");
            });
        };

        $scope.updateStoreSettings = function () {

            $scope.loading = true;
            $http({
                method: 'PUT',
                url: '/shop',
                data: $scope.activeShop
            })
                .success(function (response) {
                    $scope.activeShop = response;
                    showInfoMsg("SAVED");
                    console.log('after PUT whenClosed', $scope.activeShop.whenClosed);
                    localStorage.setItem('activeShopName', $scope.activeShop.shopName);
                    // $scope.activeShop.endTime = new Date ($scope.activeShop.endTime);
                    // $scope.activeShop.startTime = new Date ($scope.activeShop.startTime);
                    document.title = $scope.activeShop.shopName;
                    $scope.loading = false;
                }).
            error(function (response) {
                $scope.loading = false;
                showWarningMsg("UNKNOWN ERROR");
                console.log(response);
            });

        };

        $scope.changeDomainName = function(){
          console.log(document.getElementById("newDomainName").value);
          $http({
              method: 'PUT',
              url: '/shop/domain/'  + document.getElementById("newDomainName").value
          })
              .success(function (response) {
                console.log(response.data.locale);
                showInfoMsg("Ok");
              }).
          error(function (response) {
              showWarningMsg("fail");
          });
        };

        $scope.increaseBalance = function () {
            $scope.loading = true;
            $http({
                method: 'POST',
                url: '/pay?amount=' + $scope.selectedShop.balance
            })
                .success(function (response) {
                    $scope.loading = false;
                    $scope.successfullResponse = true;
                    var modalContent = document.querySelector(".proceedWithPayment");
                    console.log(response);
                    modalContent.innerHTML = response;
                    modalContent.firstChild.submit();

                }).
            error(function (response) {
                $scope.successfullResponse = false;
                $scope.loading = false;
                console.log(response);
            });
        };
        sideNavInit.sideNav();

    }]);

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

function encodeQueryData(data)
{
    var ret = [];
    for (var d in data)
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
}
