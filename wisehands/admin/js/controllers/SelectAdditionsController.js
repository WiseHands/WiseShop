angular.module('WiseHands')
    .controller('SelectAdditionsController', ['$scope', '$http', 'signout', 'sideNavInit', 'shared', '$routeParams', '$location', '$window',
        function ($scope, $http, signout, sideNavInit, shared, $routeParams, $location, $window) {

        console.log('$routeParams => ', $routeParams.productUuid);
        $http({
            method: 'GET',
            url: `/api/product/${$routeParams.productUuid}`
        }).then(response => {
            console.log('product', response);
            $scope.product = response.data;
            $scope.productAdditions = response.data.additions;

        }, error => {
            console.log(error);
        });

        $http({
            method: 'GET',
            url: '/api/addition/list'
        })
            .then(function successCallback(response) {
                $scope.availableAdditions = response.data;
                console.log("/addition/get-all/" , $scope.availableAdditions);
            }, function errorCallback(error) {
                $scope.loading = false;
                console.log(error);
            });

        $scope.selectedAddition = (additionId) => {
            console.log("additionId =>" , `/api/product/${$routeParams.productUuid}/${additionId}`);
            $scope.selectedAdditionId = additionId;
            $http({
                method: 'PUT',
                url: `/api/addition/add/${$routeParams.productUuid}/${additionId}`
            }).then(response => {
                console.log('product addition/add', response);
                $scope.product = response.data;
                $scope.productAdditions = response.data.additions;

            }, error => {
                console.log(error);
            });
        }

        sideNavInit.sideNav();
    }]);


