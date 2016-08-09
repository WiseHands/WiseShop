angular.module('WiseHands')
    .controller('EditProductController', ['$http', '$scope', '$routeParams', '$location',
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


            var fd = new FormData();

            var imageLoader = document.getElementById('imageLoader');
            imageLoader.addEventListener('change', handleImage, false);
            var canvas = document.getElementById('editCanvas');
            var ctx = canvas.getContext('2d');



            function handleImage(e){
                var reader = new FileReader();
                reader.onload = function(event){
                    var img = new Image();
                    img.onload = function(){
                        var MAX_WIDTH = 576;
                        var MAX_HEIGHT = 450;
                        var width = img.width;
                        var height = img.height;
                        height = MAX_HEIGHT;
                        width = MAX_WIDTH;

                        canvas.width = width;
                        canvas.height = height;
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0, width, height);
                        var dataURL = canvas.toDataURL('image/jpeg', 0.5);



                        var blob = dataURItoBlob(dataURL);
                        fd.append('photo', blob, "product" + Date.now());
                    };
                    img.src = event.target.result;
                };
                reader.readAsDataURL(e.target.files[0]);
            }

            $scope.updateProduct = function () {
                $scope.loading = true;
                fd.append('uuid', $scope.product.uuid);
                fd.append('name', $scope.product.name);
                fd.append('description', $scope.product.description);
                fd.append('price', $scope.product.price);


                $http.put('/product', fd, {
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': undefined,
                            'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                            'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                        }
                    })
                    .success(function(data){
                        $scope.loading = false;
                        $location.path('/product/details/' + data.uuid);
                    })
                    .error(function(){
                        $scope.loading = false;
                        console.log(error);
                    });

            };



            $scope.uploadNewProductImage = function () {
                $('#imageLoader').click();
            }

        }]);
