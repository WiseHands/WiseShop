angular.module('WiseHands')
    .controller('EditPropertyController', ['$scope', '$http', 'signout', '$routeParams', '$location', function ($scope, $http, signout, $routeParams, $location) {
        $scope.loading = true;
        $scope.propertyUuid = $routeParams.propertyUuid;
        $scope.productUuid = $routeParams.productUuid;

        $scope.goBack = function () {
            window.history.back();
        };

        $http({
            method: 'GET',
            url: '/addition/' + $scope.propertyUuid,
        })
            .then(function successCallback(response) {

                console.log("$scope.property = response.data;", response.data);
                $scope.property = response.data;
                // $scope.filepath = response.data.imagePath;
                $scope.loading = false;

            }, function errorCallback(response) {
                $scope.loading = false;
                $scope.status = 'Щось пішло не так...';
            });

        $scope.uploadNewProductImage = function () {
            $('#imageLoader').click();

        };

        fileSelected = function () {
            const photo = document.getElementById("imageLoader").files[0];
            sendPhoto(photo);
            console.log("document.getElementById(imageLoader).files[0]", photo);
        };

        function sendPhoto(photoUrl){
            let photoFd = new FormData();
            photoFd.append('logo', photoUrl);
            $http.post('/upload-file', photoFd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined,
                }
            })
                .success(function(response){
                    $scope.loading = false;
                    $scope.property.imagePath = response.filepath;

                    //update Addition imagePath with $scope.filepath
                })
                .error(function(response){
                    $scope.loading = false;
                    console.log(response);
                });
        }

        $scope.updateProperty = function () {
            $scope.loading = true;
            $http({
                method: 'PUT',
                url: '/addition/' + $scope.propertyUuid,
                data: $scope.property
            })
                .then(function successCallback(response) {
                    window.history.back();
                    $scope.loading = false;
                }, function errorCallback(response) {
                    $scope.loading = false;
                    console.log(response);
                });
        };

        $scope.createNewPropertyOption = function () {
            $scope.property.tags.push({
                additionalPrice: 0
            });
        };

        $scope.getPropertyOption = function (propertyOption, index) {
            $scope.thisPropertyOption = propertyOption;
            $scope.thisPropertyOptionIndex = index;
            $scope.succesfullDelete = false;
            $scope.deleteButton = true;

        };

        $scope.hideModal = function () {
            $('#deletePropertyOption').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        };
        $scope.deleteButton = true;
        $scope.deletePropertyOption = function () {
            $scope.deleteButton = false;
            $scope.modalSpinner = true;
            $http({
                method: 'DELETE',
                url: '/property/' + $scope.property.uuid + '/tag/' + $scope.thisPropertyOption.uuid,

            })
                .then(function successCallback(response) {
                    $scope.property.tags.splice($scope.thisPropertyOptionIndex, 1);
                    $scope.modalSpinner = false;
                    $scope.succesfullDelete = true;
                }, function errorCallback(response) {
                    $scope.modalSpinner = false;
                    console.log(response);
                });
        };

        $scope.hideModal2 = function () {
            $('#deleteProperty').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            $location.path('/products/details/' + $scope.productUuid + '/edit');
        };
        $scope.deleteButton2 = true;
        $scope.succesfullDelete2 = false;
        $scope.deleteProperty = function () {
            $scope.deleteButton2 = false;
            $scope.modalSpinner = true;
            $http({
                method: 'DELETE',
                url: '/addition/' + $scope.property.uuid,

            })
                .then(function successCallback(response) {
                    $scope.modalSpinner = false;
                    $scope.succesfullDelete2 = true;
                }, function errorCallback(response) {
                    $scope.modalSpinner = false;
                    console.log(response);
                });
        };
    }]);




