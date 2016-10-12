angular.module('SuperWiseHands')
    .controller('UserDetailsController', ['$scope', '$http', 'sideNavInit', '$routeParams',
        function($scope, $http, sideNavInit, $routeParams) {
            sideNavInit.sideNav();
            $scope.uuid = $routeParams.uuid;
            $scope.loading = true;

            $http({
                method: 'GET',
                url: '/sudo/user/' + $routeParams.uuid,
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                }
            })
                .then(function successCallback(response) {
                    $scope.loading = false;
                    $scope.userDetails = response.data;
                }, function errorCallback(response) {
                    if (response.data === 'Invalid X-AUTH-TOKEN') {
                        signout.signOut();
                    }
                    $scope.loading = false;
                    $scope.status = 'Щось пішло не так...';
                });

            $scope.deleteMessage = 'Ей, бро, ти рілі хочеш видалити цього Мішу?';
            $scope.hideModal = function () {
                $('#deleteUser').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
            };
            $scope.deleteButton = true;

            $scope.deleteUser = function () {
                $scope.deleteButton = false;
                $scope.modalSpinner = true;
                $http({
                    method: 'DELETE',
                    url: '/sudo/user/' + $routeParams.uuid,
                    headers: {
                        'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                        'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                    }
                })
                    .then(function successCallback(response) {
                        $scope.deleteMessage = 'Міша видалений.';
                        $scope.modalSpinner = false;
                        $scope.succesfullDelete = true;
                    }, function errorCallback(response) {
                        if (response.data === 'Invalid X-AUTH-TOKEN') {
                            signout.signOut();
                        }
                        $scope.modalSpinner = false;
                        console.log(response);
                    });
            };

        }]);