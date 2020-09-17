angular.module('WiseHands')
    .controller('QrMenuController', ['$scope', '$http', 'signout', 'sideNavInit', 'shared', '$window',
        function ($scope, $http, signout, sideNavInit, shared, $window) {

        $http({
            method: 'GET',
            url: 'api/qr/list',
        })
           .then((response) =>{
               if (response.data){
                  $scope.qrList = response.data;
                  console.log($scope.qrList.length);
               }
           }, (error) => {
               console.log(error);
               $scope.loading = false;
        });

         _generateUrlForQr = (uuid) => {
            let domain, hostname = $window.location.hostname;
            if (hostname === 'localhost'){
                domain = hostname + ':3334'
            } else {
                domain = hostname;
            }
           return 'https://' + domain + '/menu?uuid=' + uuid;
         }

        setQrCode = (qrList) => {
            qrList.forEach((item) => {
                let url = _generateUrlForQr(item.uuid);
                new QRious({
                    element: document.getElementById(item.uuid),
                    size: 150,
                    value: url
                });
            });
        }

        $scope.$on('ngRepeatFinished', () => setQrCode($scope.qrList));

        sideNavInit.sideNav();
    }]);


