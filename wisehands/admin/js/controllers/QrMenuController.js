angular.module('WiseHands')
    .controller('QrMenuController', ['$scope', '$http', 'signout', 'sideNavInit', 'shared',
        function ($scope, $http, signout, sideNavInit, shared) {

        $scope.isQRListPresent = true;

        $http({
            method: 'GET',
            url: 'api/qr/list',
        })
           .then((response) =>{
               console.log("$scope.shop", response);
               if (response.data){
                  $scope.qrList = response.data;
                  $scope.isQRListPresent = true;
               } else {
                  $scope.isQRListPresent = false;
               }
           }, (error) => {
               console.log(error);
               $scope.loading = false;
        });

        setQrCode = (qrList) => {

        }

        sideNavInit.sideNav();
    }]);


