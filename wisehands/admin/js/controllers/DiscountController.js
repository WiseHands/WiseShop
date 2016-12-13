angular.module('WiseHands')
    .controller('DiscountController', ['$scope', '$http', 'signout', '$routeParams', function ($scope, $http, signout, $routeParams) {
        $scope.loading = true;
        $scope.uuid = $routeParams.uuid;
        $http({
            method: 'GET',
            url: '/coupon/' + $scope.uuid,
            headers: {
                'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
            }
        })
            .then(function successCallback(response) {
                $scope.coupons = response.data;
                $scope.loading = false;
            }, function errorCallback(response) {
                if (response.data === 'Invalid X-AUTH-TOKEN') {
                    signout.signOut();
                }
                $scope.loading = false;
                console.log(response);
            });
        
        $scope.deleteCoupon = function (uuid, index) {
            $scope.loading = true;
            $http({
                method: 'DELETE',
                url: '/coupon/' + uuid,
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                }
            })
                .then(function successCallback() {
                    $scope.coupons.couponIds.splice(index, 1);
                    if($scope.coupons.couponIds.length === 0){
                        location.hash = '/payment';
                    }
                    $scope.loading = false;
                }, function errorCallback(response) {
                    if (response.data === 'Invalid X-AUTH-TOKEN') {
                        signout.signOut();
                    }
                    $scope.loading = false;
                    console.log(response);
                });

        };
        
    }]);


