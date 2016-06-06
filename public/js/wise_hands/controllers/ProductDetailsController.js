angular.module('WiseHands')
    .controller('ProductDetailsController', ['$http', '$scope', '$routeParams', '$location',
        function($http, $scope, $routeParams, $location) {
            $scope.uuid = $routeParams.uuid;
            $http({
                method: 'GET',
                url: '/product/' + $routeParams.uuid
            })
                .then(function successCallback(response) {
                    $scope.product = response.data;
                }, function errorCallback(error) {
                    console.log(error);
                });
            $scope.deleteMessage = 'Ви дійсно хочете видалити даний товар?';
            $scope.hideModal = function () {
                $('#deleteProduct').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
            };
            $scope.deleteProduct = function () {
                $http({
                    method: 'DELETE',
                    url: '/product/' + $routeParams.uuid
                })
                    .then(function successCallback(response) {
                        $scope.deleteMessage = 'Товар видалений.';
                        $scope.deleteButton = true;

                    }, function errorCallback(error) {
                        console.log(error);
                    });

            };
            $scope.updateProduct = function () {
                $http({
                    method: 'PUT',
                    url: '/product/' + $routeParams.uuid,
                    data: $scope.product
                })
                    .then(function successCallback(response) {
                        $location.path('/product/details/' + response.data.uuid);
                    }, function errorCallback(error) {
                        console.log(error);
                    });
            
            }
        }]);