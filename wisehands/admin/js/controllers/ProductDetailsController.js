angular.module('WiseHands')
    .controller('ProductDetailsController', ['$http', '$scope', '$routeParams', '$window', 'signout', function($http, $scope, $routeParams, $window, signout) {
            $scope.uuid = $routeParams.uuid;
            $scope.loading = true;
            $http({
                method: 'GET',
                url: '/addition/get-all/' + $routeParams.uuid
            })
                .then(function successCallback(response) {
                    $scope.properties = response.data;
                    console.log("/addition/get-all/" , response.data);
                }, function errorCallback(error) {
                    $scope.loading = false;
                    console.log(error);
                });

            $scope.redirectToTranslationForProductName = function(){
                $http({
                    method: 'GET',
                    url: '/api/get/translation/name/' + $routeParams.uuid
                })
                    .then(function successCallback(response) {
                        const translation = response.data;
                        $window.location.href = `#/translation/${$routeParams.uuid}/${translation.uuid}`;
                    }, function errorCallback(error) {
                        $scope.loading = false;
                        console.log(error);
                    });
            }

            $scope.redirectToTranslationForProductDescription = function(){
                $http({
                    method: 'GET',
                    url: '/api/get/translation/description/' + $routeParams.uuid
                })
                    .then(function successCallback(response) {
                        const translation = response.data;
                        $window.location.href = `#/translation/${$routeParams.uuid}/${translation.uuid}`;
                    }, function errorCallback(error) {
                        $scope.loading = false;
                        console.log(error);
                    });
            }


            $http({
                method: 'GET',
                url: '/api/product/' + $routeParams.uuid
            })
                .then(function successCallback(response) {
                    console.log("poduct details ", response.data)
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
                    url: '/api/product/' + $routeParams.uuid,
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
