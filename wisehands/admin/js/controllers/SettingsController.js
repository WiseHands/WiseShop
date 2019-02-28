angular.module('WiseHands')
    .controller('SettingsController', ['$scope', '$http', 'sideNavInit', 'signout', 'shared', '$rootScope',
    		function ($scope, $http, sideNavInit, signout, shared, $rootScope) {
        $scope.loading = true;

        $http({
            method: 'GET',
            url: '/balance',
        })
            .then(function successCallback(response) {
                $scope.balance = response.data;
                $scope.loading = false;
            }, function errorCallback(response) {
                $scope.loading = false;

            });

        $http({
            method: 'GET',
            url: '/shop/details',
        })
            .then(function successCallback(response) {
                $scope.activeShop = response.data;
                $scope.activeShop.startTime = new Date ($scope.activeShop.startTime);
                $scope.activeShop.endTime = new Date ($scope.activeShop.endTime);
                $scope.loading = false;
            }, function errorCallback(response) {
                $scope.loading = false;
            });


        $scope.updateStoreSettings = function () {
            $scope.loading = true;
            $http({
                method: 'PUT',
                url: '/shop',
                data: $scope.activeShop
            })
                .success(function (response) {
                    $scope.activeShop = response;
                    localStorage.setItem('activeShopName', $scope.activeShop.shopName);
                    $scope.activeShop.endTime = new Date ($scope.activeShop.endTime);
                    $scope.activeShop.startTime = new Date ($scope.activeShop.startTime);
                    document.title = $scope.activeShop.shopName;
                    $scope.loading = false;
                }).
            error(function (response) {
                $scope.loading = false;
                console.log(response);
            });
        };

        $scope.increaseBalance = function () {
            $scope.loading = true;
            $http({
                method: 'POST',
                url: '/pay?amount=' + $scope.selectedShop.balance,
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
        }
        sideNavInit.sideNav();

    }]);

function encodeQueryData(data)
{
    var ret = [];
    for (var d in data)
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
}
