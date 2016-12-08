angular.module('WiseHands')
    .controller('DiscountController', ['$scope', '$http', 'signout', 'shared', function ($scope, $http, signout, shared) {
        function loadOptions() {
            $scope.discountCard = shared.getDiscountCards();
        }

        loadOptions();
        $scope.deleteCoupon = function (uuid, index) {
            $scope.loading = true;
            $http({
                method: 'DELETE',
                url: '/coupons/' + uuid,
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                }
            })
                .then(function successCallback() {
                    $scope.discountCard.splice(index, 1);
                    if($scope.discountCard.length === 0){
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


