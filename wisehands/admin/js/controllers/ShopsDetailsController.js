angular.module('WiseHands')
    .controller('ShopsDetailsController', ['$http', '$scope', '$routeParams', 'signout', function($http, $scope, $routeParams, signout) {
            $scope.uuid = $routeParams.uuid;
            $scope.loading = true;

            $http({
                method: 'GET',
                url: '/shop/details',
            })
                .then(function successCallback(response) {
                  $scope.activeShop = response.data;
                }, function errorCallback(response) {
                });

            $http({
                method: 'GET',
                url: '/department/' + $routeParams.uuid
            })
                .then(function successCallback(response) {
                    $scope.shop = response.data;
                    let lat = $scope.shop.destinationLat;
                    let lng = $scope.shop.destinationLng;
                    $scope.coords = lat + "," + lng;
                    console.log($scope.coords);
                    $scope.loading = false;

                    console.log("$scope.shop", $scope.shop);

                }, function errorCallback(error) {
                    console.log(error);
                });


            $scope.select= function(index) {
            $scope.selected = index;
            };
            $scope.hideModal = function () {
                $('#deleteProduct').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
            };
            $scope.deleteButton = true;
            $scope.deleteProduct = function () {
                $scope.deleteButton = false;
                $scope.modalSpinner = true;
                $http({
                    method: 'DELETE',
                    url: '/department/' + $routeParams.uuid,
                })
                    .then(function successCallback(response) {
                        $scope.modalSpinner = false;
                        $scope.succesfullDelete = true;

                    }, function errorCallback(response) {
                        $scope.modalSpinner = false;
                        console.log(response);
                    });

            };
        $scope.goBack = function () {
            window.history.back();
        }
        }]);
