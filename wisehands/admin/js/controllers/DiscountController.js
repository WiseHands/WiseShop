angular.module('WiseHands')
    .controller('DiscountController', ['$scope', '$http', 'signout', '$routeParams', function ($scope, $http, signout, $routeParams) {
        $scope.loading = true;
        $scope.uuid = $routeParams.uuid;
        $http({
            method: 'GET',
            url: '/coupon/' + $scope.uuid,
        })
            .then(function successCallback(response) {
                $scope.coupons = response.data;
                $scope.loading = false;
            }, function errorCallback(response) {
                $scope.loading = false;
                console.log(response);
            });
        
        $scope.deleteCoupon = function (uuid, index) {
            $scope.loading = true;
            $http({
                method: 'DELETE',
                url: '/coupon/' + uuid,

            })
                .then(function successCallback() {
                    $scope.coupons.couponIds.splice(index, 1);
                    if($scope.coupons.couponIds.length === 0){
                        location.hash = '/payment';
                    }
                    $scope.loading = false;
                }, function errorCallback(response) {
                    $scope.loading = false;
                    console.log(response);
                });

        };
        
    }]);


