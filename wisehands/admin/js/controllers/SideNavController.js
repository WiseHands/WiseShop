angular.module('WiseHands')
    .controller('SideNavController', ['$scope', '$http', '$route', 'signout', '$window', 'shared',
    			function ($scope, $http, $route, signout, $window) {
        $scope.$route = $route;

        $http({
            method: 'GET',
            url: '/profile',
            // headers: {
            //     'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
            //     'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
            // }
        })
            .then(function successCallback(response) {
                var profile = response.data;
                $scope.getProfileImage = function () {
                    if (profile.profileUrl) {
                        return profile.profileUrl;
                    } else {
                        return '/wisehands/assets/images/onerror_image/onerror_image_white.png';
                    }
                };


            }, function errorCallback(data) {
                console.log('error retrieving profile');
            });


        $http({
            method: 'GET',
            url: '/shop/details',
            // headers: {
            //     'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
            //     'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
            // }
        })
            .then(function successCallback(response) {
                $scope.activeShop = response.data;
                localStorage.setItem('activeShop', $scope.activeShop.uuid);
                localStorage.setItem('activeShopName', $scope.activeShop.shopName);
            }, function errorCallback(response) {
                // if (response.data === 'Invalid X-AUTH-TOKEN') {
                //     signout.signOut();
                // }
            });

        $scope.$watch(function () {
            if (!$scope.activeShop) {
                return;
            }
            $scope.activeShop.shopName = localStorage.getItem('activeShopName');


        });

        $scope.getUrl = function () {
            $window.location.href = window.location.protocol + '//' + $scope.activeShop.domain + ':' + window.location.port;
        };
        $scope.signOut = signout.signOut;


    }]);
