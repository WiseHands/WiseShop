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
           return 'https://' + domain + '/?qr_uuid='+ uuid;
         }

        setQrCode = (qrList) => {
            qrList.forEach((item) => {
                let url = _generateUrlForQr(item.uuid);
                let options = {
                    text: url,
                    width: 150,
                    height: 150,
                    colorDark: "#0e2935",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H,
                    quietZone: 8,
                    quietZoneColor: 'transparent',
                    drawer: 'canvas'
                };
                new QRCode(document.getElementById(item.uuid), options);
            });
        }

        $scope.$on('ngRepeatFinished', () => setQrCode($scope.qrList));

        sideNavInit.sideNav();
    }]);


