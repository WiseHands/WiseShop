angular.module('WiseHands')
    .controller('SubmitNewProductController', [
        '$scope', '$location', '$http', 'signout', '$uibModal',
        function ($scope, $location, $http, signout, $uibModal) {


        $http({
            method: 'GET',
            url: '/category'
        })
            .then(function successCallback(response) {
                $scope.categories = response.data;
                $scope.loading = false;
            }, function errorCallback(error) {
                $scope.loading = false;
                console.log(error);
            });

        var fd = new FormData();

        var imageLoader = document.getElementById('imageLoader');
        imageLoader.addEventListener('change', handleImage, false);
        var canvas = document.getElementById('imageCanvas');
        $scope.productImages = [];
        $scope.productImagesDTO = [];
        function handleImage(e){
            $scope.$apply(function() {
                $scope.loading = true;
            });
            var file  = e.target.files[0];
            var reader = new FileReader();

            reader.onloadend = function(event){

                var img = new Image();
                img.onload = function(){

                    var MAX_WIDTH = 700;
                    var MAX_HEIGHT = 525;
                    height = MAX_HEIGHT;
                    width = MAX_WIDTH;

                    canvas.width = width;
                    canvas.height = height;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, width, height);
                    var dataURL = canvas.toDataURL('image/jpeg', 0.9);

                    var blob = dataURItoBlob(dataURL);

                    $scope.$apply(function() {
                        if(!$scope.product || $scope.product.mainPhoto){
                            $scope.product = {};
                            $scope.product.mainPhoto = 0;
                        }
                        $scope.product.mainPhoto = 0;
                        $scope.productImages.push(dataURL);
                        $scope.productImagesDTO.push(blob);
                        $scope.loading = false;

                    });


                };
                img.src = event.target.result;


            };
            if (file && file.type.match('image.*')) {
                reader.readAsDataURL(e.target.files[0]);
            } else {
                $scope.$apply(function() {
                    $scope.loading = false;
                });
            }



        }

        $scope.loadImage = function () {
            $('#imageLoader').click();
        };

        $scope.setMainPhotoIndex = function (index) {
            if ($scope.product){
                $scope.product.mainPhoto = index;
            }
        };

        $scope.removeImage = function (index){
            $scope.productImages.splice(index, 1);
            $scope.productImagesDTO.splice(index, 1);
            if (index === $scope.product.mainPhoto){
                $scope.product.mainPhoto = 0;
            }
        };

        // Edit image
        $scope.editImage = function(image, index){
            console.log('Dto', $scope.productImagesDTO);
            console.log($scope.productImages);
            if ( image ){
                var modal = $uibModal.open({
                    size: 'md',
                    templateUrl: '/wisehands/admin/partials/ImageCropper.html',
                    controller: 'ImageCropperController',
                    controllerAs: 'vm',
                    resolve: {
                        currentImage: function(){
                            return {
                                dataURL: image
                            };
                        }
                    }
                });
                modal.result.then(
                    function(result){
                        var idx = $scope.productImages.indexOf(image);
                        $scope.productImages[idx] = result;

                        var blob = dataURItoBlob(result);
                        $scope.productImagesDTO[index] = blob;
                    },
                    function(err){
                        console.log(err);
                    }
                )
            }
        }

        $scope.createCategory = function () {
            $scope.loading = true;
            $http({
                method: 'POST',
                url: '/category',
                // headers: {
                //     'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                //     'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                // },
                data: $scope.category
            })
                .then(function successCallback(response) {

                    $scope.loading = false;
                    $scope.hideModal();

                }, function errorCallback(response) {
                    // if (response.data === 'Invalid X-AUTH-TOKEN') {
                    //     signout.signOut();
                    // }
                    $scope.loading = false;
                    console.log(response);
                });
        };
        $scope.createCategory = function () {
            $scope.loading = true;
            $http({
                method: 'POST',
                url: '/category',
                // headers: {
                //     'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                //     'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                // },
                data: $scope.newCategory
            })
                .then(function successCallback(response) {
                    $scope.createdCategory = response.data;
                    $scope.categories.push($scope.createdCategory);
                    if(!$scope.product){
                        $scope.product= {};
                    }
                    $scope.product.category = $scope.createdCategory;
                    $scope.loading = false;
                    $scope.hideModal();

                }, function errorCallback(response) {
                    // if (response.data === 'Invalid X-AUTH-TOKEN') {
                    //     signout.signOut();
                    // }
                    $scope.loading = false;
                    console.log(response);
                });
        };
        $scope.hideModal = function () {
            $('#categoryModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        };
        $scope.submitProduct = function () {
            $scope.loading = true;
            for (var i = 0; i < $scope.productImagesDTO.length; i++) {
                var blob = $scope.productImagesDTO[i];
                fd.append("photos[" + i + "]", blob);
            }
            fd.append('name', $scope.product.name);
            fd.append('description', $scope.product.description);
            fd.append('price', $scope.product.price);
            fd.append('mainPhotoIndex', $scope.product.mainPhoto);
            fd.append('category', $scope.product.category.uuid);
            fd.append('isActive', $scope.product.isActive);
            fd.append('oldPrice', $scope.product.oldPrice);
            fd.append('sortOrder', $scope.product.sortOrder);

            $http.post('/product', fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined,
                        // 'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                        // 'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                    }
                })
                .success(function(data){
                    $scope.loading = false;
                    $location.path('/product/details/' + data.uuid);
                })
                .error(function(response){
                    // if (response.data === 'Invalid X-AUTH-TOKEN') {
                    //     signout.signOut();
                    // }
                    $scope.loading = false;
                    console.log(response);
                });
        };
    }]);

function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
}
