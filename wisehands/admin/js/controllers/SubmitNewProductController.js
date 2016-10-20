angular.module('WiseHands')
    .controller('SubmitNewProductController', ['$scope', '$location', '$http', 'signout', function ($scope, $location, $http, signout) {


        // $(document).ready(function(){
        //     $('[data-toggle="tooltip"]').tooltip({animation: true, delay: {show: 300, hide: 300}});
        // });

        var fd = new FormData();

        var imageLoader = document.getElementById('imageLoader');
        imageLoader.addEventListener('change', handleImage, false);
        var canvas = document.getElementById('imageCanvas');
        $scope.productImages = [];
        $scope.productImagesDTO = [];
        function handleImage(e){
            var reader = new FileReader();
            $scope.$apply(function() {
                $scope.loading = true;
            });
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

                    // fd.append('photo', blob);

                    $scope.$apply(function() {
                        if(!$scope.product){
                            $scope.product = {};
                            $scope.product.mainPhoto = 0;
                        } 
                        $scope.productImages.push(dataURL);
                        $scope.productImagesDTO.push(blob);

                    });
                };
                img.src = event.target.result;
                $scope.loading = false;

            };
            reader.readAsDataURL(e.target.files[0]);


        }

        $scope.loadImage = function () {
            $('#imageLoader').click();
        };

        $scope.setMainPhotoIndexToZero = function () {
            if(!$scope.product){
                $scope.product = {};
                $scope.product.mainPhoto = 0;
            } else if($scope.product.mainPhoto) {
                $scope.product.mainPhoto = 0;
            }
        };
        
        $scope.setMainPhotoIndex = function (index) {
            if ($scope.product){
                $scope.product.mainPhoto = index + 1;
            }
        };

        $scope.removeMainImage = function (){
            
            $scope.productImages.splice(0, 1);
            $scope.productImagesDTO.splice(0, 1);
            console.log($scope.productImages, $scope.productImagesDTO);
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

            $http.post('/product', fd, {
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
    }]);

function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
}
