angular.module('WiseHands')
    .controller('UserProfileController', ['$scope', '$http', 'signout', 'sideNavInit',
        function ($scope, $http, signout, sideNavInit) {
        $scope.loading = true;
        $http({
            method: 'GET',
            url: '/profile',
            headers: {
                'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
            }
        })
            .then(function successCallback(response) {
                $scope.loading = false;
                $scope.userInfo = response.data;
            }, function errorCallback(data) {
                $scope.loading = false;
                signout.signOut();
            });

            $scope.updateUserInfo = function () {
                $http({
                    method: 'PUT',
                    url: '/profile',
                    data: $scope.userInfo,
                    headers: {
                        'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                        'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                    }
                })
                    .then(function successCallback(response) {
                        debugger;
                        $scope.loading = false;
                        $scope.userInfo = response.data;
                        debugger;
                    }, function errorCallback(data) {
                        $scope.loading = false;
                        signout.signOut();
                    });
            };

        // $scope.dateFormat = function (balanceDetail) {
        //     var date = new Date(balanceDetail.date);
        //     var ddyymm = new Date(balanceDetail.date).toISOString().slice(0,10);
        //     var hour = (date.getHours()<10?'0':'') + date.getHours();
        //     var minute = (date.getMinutes()<10?'0':'') + date.getMinutes();
        //     return ddyymm + ' ' + hour + ':' + minute;
        // };
        // $scope.paymentState = function(balanceDetail){
        //     if (balanceDetail.amount > 0){
        //         return 'teal';
        //     } else {
        //         return '#03a9f4';
        //     }
        // };
        // $scope.isTransactionPayed = function (balanceDetail) {
        //     if (balanceDetail.state === 'PAYED') {
        //         return true;
        //     }
        //
        // }
            sideNavInit.sideNav();
    }]);
