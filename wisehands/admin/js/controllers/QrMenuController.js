angular.module('WiseHands')
    .controller('QrMenuController', ['$scope', '$http', 'signout', 'sideNavInit', 'shared',
        function ($scope, $http, signout, sideNavInit, shared) {

        $http({
            method: 'GET',
            url: 'api/qr/list',
        })
           .then((response) =>{
               if (response.data){
                  $scope.qrList = response.data;
               }
           }, (error) => {
               console.log(error);
               $scope.loading = false;
        });

        setQrCode = (qrList) => {
            qrList.forEach((item) => {
                let qr = new QRious({
                    element: document.getElementById(item.uuid),
                    size: 150,
                    value: item.name
                });

            });
        }

        $scope.$on('ngRepeatFinished', () => { setQrCode($scope.qrList); });

        sideNavInit.sideNav();
    }]);


