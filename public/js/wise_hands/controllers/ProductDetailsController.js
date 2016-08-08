angular.module('WiseHands')
    .controller('ProductDetailsController', ['$http', '$scope', '$routeParams', '$location',
        function($http, $scope, $routeParams, $location, $route) {
            $scope.$route = $route;
            $scope.uuid = $routeParams.uuid;
            $scope.loading = true;
            $http({
                method: 'GET',
                url: '/product/' + $routeParams.uuid
            })
                .then(function successCallback(response) {
                    $scope.loading = false;
                    $scope.product = response.data;
                    $scope.loadImgOntoCanvas();
                }, function errorCallback(error) {
                    $scope.loading = false;
                    console.log(error);
                });


            $scope.deleteMessage = 'Ви дійсно хочете видалити даний товар?';
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
                    headers: {
                        'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                        'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                    }
                })
                    .then(function successCallback(response) {
                        $scope.modalSpinner = false;
                        $scope.succesfullDelete = true;
                        $scope.deleteMessage = 'Товар видалений.';

                    }, function errorCallback(error) {
                        $scope.modalSpinner = false;
                        console.log(error);
                    });

            };
            $scope.updateProduct = function () {
                $http({
                    method: 'PUT',
                    url: '/product/' + $routeParams.uuid,
                    data: $scope.product,
                    headers: {
                        'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                        'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                    }
                })
                    .then(function successCallback(response) {
                        $location.path('/product/details/' + response.data.uuid);
                    }, function errorCallback(error) {
                        console.log(error);
                    });
            
            };

            $scope.loadImgOntoCanvas = function () {
                var img = new window.Image();
                img.addEventListener("load", function () {
                    var canvas = document.getElementById("editCanvas");
                    canvas.width = img.width;
                    canvas.height = img.height;

                    canvas.getContext("2d").drawImage(img, 0,0, canvas.width, canvas.height);
                });
                img.setAttribute("src", '/public/product_images/' + $scope.product.fileName);
            };
            
            $scope.uploadNewProductImage = function () {
                $('#imageLoader').click();
            }
            
        }]);