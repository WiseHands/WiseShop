angular.module('WiseHands')
    .controller('EditProductController', ['$http', '$scope', '$routeParams', '$location', 'signout', function($http, $scope, $routeParams, $location, signout) {

            $scope.uuid = $routeParams.uuid;
            $scope.loading = true;
            $http({
                method: 'GET',
                url: '/product/' + $routeParams.uuid
            })
                .then(function successCallback(response) {

                    $scope.product = response.data;
                    $scope.activeShop = localStorage.getItem('activeShop');
                    $scope.product.images.forEach(function(image, index){
                        if(image.uuid === $scope.product.mainImage.uuid){
                            $scope.product.mainPhoto = index;
                        }
                    });
                    $scope.loadImgOntoCanvas();
                    $scope.loading = false;
                }, function errorCallback(error) {
                    $scope.loading = false;
                    console.log(error);
                });

            $http({
                method: 'GET',
                url: '/category'
            })
                .then(function successCallback(response) {
                    $scope.categories = response.data;
                    // $scope.categories.forEach(function(category, index){
                    //     if(category.uuid === $scope.product.category.uuid){
                    //         $scope.product.category = $scope.categories[index];
                    //     }
                    // });

                    $scope.loading = false;
                }, function errorCallback(error) {
                    $scope.loading = false;
                    console.log(error);
                });


            $scope.loadImgOntoCanvas = function () {
                $scope.productImages = [];
                $scope.product.images.forEach(function(image, index) {
                    var img = new window.Image();

                    img.addEventListener("load", function () {
                        var canvas = document.getElementById("editCanvas");
                        canvas.width = img.width;
                        canvas.height = img.height;
                        canvas.getContext("2d").drawImage(img, 0,0, canvas.width, canvas.height);
                        var dataURL = canvas.toDataURL('image/jpeg', 0.5);
                        var productImage = {};
                        $scope.$apply(function() {
                            productImage.uuid = $scope.product.images[index].uuid;
                            productImage.dataURL = dataURL;
                            $scope.productImages.push(productImage);
                        });
                    });
                    img.src = '/public/product_images/' + $scope.activeShop + '/' + image.filename;

                    });

            };



            var fd = new FormData();


            var imageLoader = document.getElementById('imageLoader');
            imageLoader.addEventListener('change', handleImage, false);
            var canvas = document.getElementById('editCanvas');

            function handleImage(e){
                $scope.$apply(function() {
                    $scope.loading = true;
                });
                var reader = new FileReader();

                reader.onload = function(event){

                    var img = new Image();
                    img.onload = function(){

                        var MAX_WIDTH = 576;
                        var MAX_HEIGHT = 432;
                        height = MAX_HEIGHT;
                        width = MAX_WIDTH;

                        canvas.width = width;
                        canvas.height = height;
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0, width, height);
                        var dataURL = canvas.toDataURL('image/jpeg', 0.5);
                        var blob = dataURItoBlob(dataURL);
                        $scope.myBlob = [blob];
                        $scope.addNewPhoto();
                    };

                    img.src = event.target.result;

                };
                reader.readAsDataURL(e.target.files[0]);


            }
        $scope.addNewPhoto = function () {
            var imageFd = new FormData();
            for (var i = 0; i < $scope.myBlob.length; i++) {
                var blob = $scope.myBlob[i];
                imageFd.append("photos[" + i + "]", blob);
            }
            $http.put('/product/' + $routeParams.uuid + '/image', imageFd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined,
                        'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                        'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                    }
                })
                .success(function(response){
                    $scope.product = response;
                    $scope.product.images.forEach(function(image, index){
                        if(image.uuid === $scope.product.mainImage.uuid){
                            $scope.product.mainPhoto = index;
                        }
                    });
                    $scope.loadImgOntoCanvas();
                    $scope.loading = false;
                })
                .error(function(response){
                    if (response.data === 'Invalid X-AUTH-TOKEN') {
                        signout.signOut();
                    }
                    $scope.loading = false;
                    console.log(response);
                });
        };


            $scope.setMainPhotoIndex = function (index, uuid) {
                $scope.loading = true;
                if ($scope.product){
                    $scope.product.mainPhoto = index;
                }
                $http({
                    method: 'PUT',
                    url: '/product/' + $routeParams.uuid + '/image/' + uuid,
                    headers: {
                        'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                        'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                    }
                })
                    .then(function successCallback(response) {
                        $scope.product = response.data;
                        $scope.product.images.forEach(function(image, index){
                            if(image.uuid === $scope.product.mainImage.uuid){
                                $scope.product.mainPhoto = index;
                            }
                        });
                        $scope.loadImgOntoCanvas();
                        $scope.loading = false;

                    }, function errorCallback(response) {
                        if (response.data === 'Invalid X-AUTH-TOKEN') {
                            signout.signOut();
                        }
                        $scope.loading = false;
                        console.log(response);
                    });
            };

            $scope.removeImage = function (uuid){
                $scope.loading = true;
                $http({
                    method: 'DELETE',
                    url: '/product/' + $routeParams.uuid + '/image/' + uuid,
                    headers: {
                        'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                        'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                    }
                })
                    .then(function successCallback(response) {
                        $scope.product = response.data;
                        $scope.product.images.forEach(function(image, index){
                            if(image.uuid === $scope.product.mainImage.uuid){
                                $scope.product.mainPhoto = index;
                            }
                        });
                        $scope.loadImgOntoCanvas();
                        $scope.loading = false;

                    }, function errorCallback(response) {
                        if (response.data === 'Invalid X-AUTH-TOKEN') {
                            signout.signOut();
                        }
                        $scope.loading = false;
                        console.log(response);
                    });
            };
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
                    .error(function(response){
                        if (response.data === 'Invalid X-AUTH-TOKEN') {
                            signout.signOut();
                        }
                        $scope.loading = false;
                        console.log(response);
                    });

            };

            $scope.uploadNewProductImage = function () {
                $('#imageLoader').click();
            };

            $scope.createCategory = function () {
                $scope.loading = true;
                $http({
                    method: 'POST',
                    url: '/category',
                    headers: {
                        'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                        'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                    },
                    data: $scope.newCategory
                })
                    .then(function successCallback(response) {
                        $scope.createdCategory = response.data;
                        $scope.categories.push($scope.createdCategory);
                        $scope.product.category = $scope.createdCategory;
                        $scope.changeCategory();
                        $scope.loading = false;
                        $scope.hideModal();

                    }, function errorCallback(response) {
                        if (response.data === 'Invalid X-AUTH-TOKEN') {
                            signout.signOut();
                        }
                        $scope.loading = false;
                        console.log(response);
                    });
            };
            $scope.hideModal = function () {
                $('#categoryModal').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
            };
            $scope.changeCategory = function () {
                $scope.loading = true;
                $http({
                    method: 'PUT',
                    url: '/category/' + $scope.product.category.uuid + '/product/' + $routeParams.uuid,
                    headers: {
                        'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                        'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                    }
                })
                    .then(function successCallback(response) {
                        $scope.category = response.data.category;
                        $scope.product.category = $scope.category;
                        $scope.loading = false;

                    }, function errorCallback(response) {
                        if (response.data === 'Invalid X-AUTH-TOKEN') {
                            signout.signOut();
                        }
                        $scope.loading = false;
                        console.log(response);
                    });
            }

        }]);
function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
}

