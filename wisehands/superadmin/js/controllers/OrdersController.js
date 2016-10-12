angular.module('SuperWiseHands')
    .controller('OrdersController', ['$scope', '$http', 'sideNavInit',
        function($scope, $http, sideNavInit) {
            sideNavInit.sideNav();
            $scope.loading = true;

            $http({
                method: 'GET',
                url: '/sudo/orders',
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                }
            })
                .then(function successCallback(response) {
                    $scope.loading = false;
                    $scope.orders = response.data;
                }, function errorCallback(response) {
                    if (response.data === 'Invalid X-AUTH-TOKEN') {
                        signout.signOut();
                    }
                    $scope.loading = false;
                    $scope.status = 'Щось пішло не так...';
                });
            $scope.orderState = function(item){
                if (item.state === "NEW"){
                    return 'rgb(100, 181, 246)';
                } else if (item.state === "PAYED") {
                    return 'rgb(129, 199, 132)';
                } else if (item.state === "CANCELLED") {
                    return 'rgb(255, 183, 77)';
                } else if (item.state === "SHIPPED") {
                    return 'rgb(207, 216, 220)';
                } else if (item.state === "MANUALLY_PAYED") {
                    return 'rgb(221, 201, 230)';
                } else if (item.state === "PAYMENT_ERROR") {
                    return 'rgb(255, 171, 145)';
                } else if (item.state === "DELETED") {
                    return 'rgba(244, 67, 54, 0.7)';
                }

            };
        }]);