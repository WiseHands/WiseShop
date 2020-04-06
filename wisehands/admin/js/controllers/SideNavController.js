angular.module('WiseHands')
    .controller('SideNavController', ['$scope', '$http', '$route', 'signout', '$window', 'shared',
    			function ($scope, $http, $route, signout, $window) {
        $scope.$route = $route;


        $http({
            method: 'GET',
            url: '/shop/details',
        })
            .then(function successCallback(response) {
                $scope.activeShop = response.data;
                localStorage.setItem('activeShop', $scope.activeShop.uuid);
                localStorage.setItem('activeShopName', $scope.activeShop.shopName);
                console.log("/shop/details", response);
            }, function errorCallback(response) {
            });

        $http({
            method: 'GET',
            url: '/api/network',
        })
            .then(function successCallback(response) {
                console.log("network", response);
                if (response.data != null){
                    $scope.networkName = response.data.networkName;
                    $scope.networkUuid = response.data.uuid;

                } else {
                    $scope.networkName = null;
                    $scope.networkUuid = null;

                }
                }, function errorCallback(reason) {
                }
            );

        $scope.getNetwork = function () {
            $window.location.href = '/admin#/networkshoplist/' + $scope.networkUuid;

        };

        $scope.$watch(function () {
            if (!$scope.activeShop) {
                return;
            }
            $scope.activeShop.shopName = localStorage.getItem('activeShopName');


        });

        $scope.getUrl = function () {
            $window.location.href = window.location.protocol + '//' + $scope.activeShop.domain + ':' + window.location.port + '#!/#selectedShop=true';
        };
        $scope.signOut = signout.signOut;


    }]);
