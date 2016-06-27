angular.module('WiseHands')
    .controller('SubmitNewProductController', function ($scope, $location, $http) {
        var fd = new FormData();

        var imageLoader = document.getElementById('imageLoader');
        imageLoader.addEventListener('change', handleImage, false);
        var canvas = document.getElementById('imageCanvas');
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
                    fd.append('photo', blob);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        }

        $scope.getTheFiles = function ($files) {

        };
        $scope.submitProduct = function () {
            fd.append('name', $scope.product.name);
            fd.append('description', $scope.product.description);
            fd.append('price', $scope.product.price);

            $http.post('/product', fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined,
                        'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                        'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                    }
                })
                .success(function(data){
                    $location.path('/product/details/' + data.uuid);
                })
                .error(function(){
                    console.log(error);
                });
        };
    });

// function dataURItoBlob(dataURI) {
//     // convert base64/URLEncoded data component to raw binary data held in a string
//     var byteString;
//     if (dataURI.split(',')[0].indexOf('base64') >= 0)
//         byteString = atob(dataURI.split(',')[1]);
//     else
//         byteString = unescape(dataURI.split(',')[1]);
//
//     // separate out the mime component
//     var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
//
//     // write the bytes of the string to a typed array
//     var ia = new Uint8Array(byteString.length);
//     for (var i = 0; i < byteString.length; i++) {
//         ia[i] = byteString.charCodeAt(i);
//     }
//
//     return new Blob([ia], {type:mimeString});
// }
function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
}