angular.module('WiseHands')
    .controller('EditPageController', ['$scope', '$http', 'signout', '$routeParams', 'sideNavInit',
                function ($scope, $http, signout, $routeParams, sideNavInit) {
        $scope.loading = true;
        sideNavInit.sideNav();

        $http({
            method: 'GET',
            url: '/pageconstructor/' + $routeParams.uuid
        }).then(function successCallback(response) {
                $scope.title = response.data.title;
                $scope.url = response.data.url;
                CKEDITOR.replace('editor');
                CKEDITOR.instances["editor"].setData(response.data.body);

                console.log("POST $scope.settings", response.data);
                $scope.loading = false;
            }, function errorCallback(response) {
                console.log("POST $scope.settings", response);
                $scope.loading = false;
        });

//         var imageLoader = document.getElementById('imageLoader');
//         imageLoader.addEventListener('change', handleImage, false);
//         var canvas = document.getElementById('imageCanvas');
//         function handleImage(e){
//             $scope.$apply(function() {
//                 $scope.loading = true;
//             });
//             var file  = e.target.files[0];
//             var reader = new FileReader();
//
//             reader.onloadend = function(event){
//
//                 var img = new Image();
//                 img.onload = function(){
//
//                     var MAX_WIDTH = 700;
//                     var MAX_HEIGHT = 525;
//                     height = MAX_HEIGHT;
//                     width = MAX_WIDTH;
// // have some error
//                     canvas.width = width;
//                     canvas.height = height;
//                     var ctx = canvas.getContext("2d");
//                     ctx.drawImage(img, 0, 0, width, height);
//                     var dataURL = canvas.toDataURL('image/jpeg', 0.9);
//
//                     var blob = dataURItoBlob(dataURL);
//
//                     $http({
//                         method: 'GET',
//                         url: 'https://wisestorage.wisehands.me/uploadFile',
//                         data: blob
//                     }).then(function successCallback(response) {
//                         console.log("successCallback", response);
//                     }, function errorCallback(response) {
//                         console.log("errorCallback", response);
//                     });
//
//
//                 };
//                 img.src = event.target.result;
//
//
//             };
//             if (file && file.type.match('image.*')) {
//                 reader.readAsDataURL(e.target.files[0]);
//             } else {
//                 $scope.$apply(function() {
//                     $scope.loading = false;
//                 });
//             }
//
//
//
//         };

        $scope.loadImage = function () {
            $('#imageLoader').click();
        };

        $scope.saveThisPage = function () {
            $scope.loading = true;

            showInfoMsg("SAVED");
            let htmlData = CKEDITOR.instances["editor"].getData();
            let requestBody = {
                title: $scope.title,
                url: $scope.url,
                body: htmlData
            };

            $http({
                method: 'PUT',
                url: '/pageconstructor/' + $routeParams.uuid,
                data: requestBody
            })
                .then(function successCallback(response) {
                    console.log("PUT $scope.settings", response.data);
                    $scope.loading = false;
                    showInfoMsg("SAVED");
                }, function errorCallback(response) {
                    showWarningMsg("UNKNOWN ERROR");
                    console.log("PUT $scope.settings", response);
                    $scope.loading = false;
                });
        };


    }]);

function showWarningMsg(msg) {
    toastr.clear();
    toastr.options = {
        "positionClass": "toast-bottom-center",
        "preventDuplicates": true
    };
    toastr.warning(msg);
}
function showInfoMsg(msg) {
    toastr.clear();
    toastr.options = {
        "positionClass": "toast-bottom-right",
        "preventDuplicates": true
    };
    toastr.info(msg);
}