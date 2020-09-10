angular.module('WiseHands')
    .controller('QrMenuController', ['$scope', '$http', 'signout', 'sideNavInit', 'shared',
        function ($scope, $http, signout, sideNavInit, shared) {

        $http({
            method: 'GET',
            url: 'api/qr/list',
        })
           .then((response) =>{
               console.log("$scope.shop", response);
           }, (error) => {
               console.log(error);
               $scope.loading = false;
        });

        sideNavInit.sideNav();
    }]);


