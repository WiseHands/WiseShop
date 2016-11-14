angular.module('SuperWiseHands')
    .controller('SideNavController', ['$scope', '$http', '$route', 'signout', '$window',
        function ($scope, $http, $route, signout) {
            $scope.$route = $route;

            $http({
                method: 'GET',
                url: '/profile',
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                }
            })
                .then(function successCallback(response) {
                    $scope.profile = response.data;
                    debugger;
                    $scope.getProfileImage = function () {
                        if ($scope.profile.profileUrl) {
                            return $scope.profile.profileUrl;
                        } else {
                            return '/wisehands/assets/images/onerror_image/onerror_image_white.png';
                        }
                    };


                }, function errorCallback(data) {
                    console.log('error retrieving profile');
                });


            $scope.signOut = signout.signOut;


        }]);
