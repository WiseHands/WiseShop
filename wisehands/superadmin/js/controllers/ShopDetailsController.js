angular.module('SuperWiseHands')
    .controller('ShopDetailsController', ['$scope', '$http', 'sideNavInit', '$routeParams',
        function($scope, $http, sideNavInit, $routeParams) {
            sideNavInit.sideNav();
            $scope.uuid = $routeParams.uuid;
            $scope.loading = true;

            $http({
                method: 'GET',
                url: '/sudo/shop/' + $routeParams.uuid,
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                }
            })
                .then(function successCallback(response) {
                    $scope.loading = false;
                    $scope.shopDetails = response.data;
                    debugger;

                }, function errorCallback(response) {
                    if (response.data === 'Invalid X-AUTH-TOKEN') {
                        signout.signOut();
                    }
                    $scope.loading = false;
                    $scope.status = 'Щось пішло не так...';
                });

            $scope.deleteMessage = 'Ви дійсно хочете видалити даний магазин?';
            $scope.hideModal = function () {
                $('#deleteShop').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
            };
            $scope.deleteButton = true;

            $scope.deleteShop = function () {
                $scope.deleteButton = false;
                $scope.modalSpinner = true;
                $http({
                    method: 'DELETE',
                    url: '/sudo/shop/' + $routeParams.uuid,
                    headers: {
                        'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                        'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                    }
                })
                    .then(function successCallback(response) {
                        $scope.deleteMessage = 'Магазин видалений.';
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