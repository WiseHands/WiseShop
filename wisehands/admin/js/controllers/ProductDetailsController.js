angular.module('WiseHands')
    .controller('ProductDetailsController', ['$http', '$scope', '$routeParams', 'signout', function($http, $scope, $routeParams, signout) {
            $scope.uuid = $routeParams.uuid;
            $scope.loading = true;
            $http({
                method: 'GET',
                url: '/product/' + $routeParams.uuid
            })
                .then(function successCallback(response) {
                    $scope.loading = false;
                    $scope.product = response.data;
                    $scope.activeShop = localStorage.getItem('activeShop');
                    $scope.product.images.forEach(function(image, index){
                        if(image.uuid === $scope.product.mainImage.uuid){
                            $scope.selected = index;
                        }
                    })

                }, function errorCallback(error) {
                    $scope.loading = false;
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
                    url: '/product/' + $routeParams.uuid,
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