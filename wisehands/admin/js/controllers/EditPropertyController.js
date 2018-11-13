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
            url: '/property/' + $scope.propertyUuid,
        })
            .then(function successCallback(response) {
                $scope.property = response.data;
                $scope.loading = false;

            }, function errorCallback(response) {
                $scope.loading = false;
                $scope.status = 'Щось пішло не так...';
            });

        $scope.deletePropertyOption = function (index) {
            $scope.property.tags.splice(index, 1);
        };

        $scope.updateProperty = function () {
            $scope.loading = true;
            $scope.property.tags = $scope.property.tags.filter(function(tag){
                return !!tag.value;
            });
            $http({
                method: 'PUT',
                url: '/property/' + $scope.propertyUuid,
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
                url: '/property/' + $scope.property.uuid,

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




