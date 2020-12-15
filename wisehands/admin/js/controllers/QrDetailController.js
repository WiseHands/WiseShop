angular.module('WiseHands')
    .controller('QrDetailController', ['$scope', '$http', 'signout', 'sideNavInit', 'shared', '$routeParams', '$location', '$window',
        function ($scope, $http, signout, sideNavInit, shared, $routeParams, $location, $window) {

        console.log('location => ', $location);

        $http({
            method: 'GET',
            url: `/api/qr/info/${$routeParams.uuid}`
        }).then(response => {
            console.log('/api/qr/info, ',response);
            $scope.qr = response.data;
            showQR($scope.qr);
        }, error => {
            console.log(error);
        });

        $scope.redirectToEdit = () => {
            $window.location.href = `#/qredit/${$routeParams.uuid}`;
        }

        showQR = (qrCode) =>{
            let url = _generateUrlForQr(qrCode.uuid);
            let options = {
                text: url,
                width: 600,
                height: 600,
                colorDark: "#0e2935",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H,
                quietZone: 8,
                quietZoneColor: 'transparent',
                logo: "wisehands/assets/images/main_logo_black.png",
                logoBackgroundTransparent: false,
                title: 'wstore.pro',
                titleColor: "#0e2935",
                titleFont: "bold 34px Roboto,sans-serif",
                tooltip: url,
                titleHeight: 50,
                titleTop: 30,
                drawer: 'canvas'
            };
       new QRCode(document.getElementById('qr-code'), options);
/*           new QRious({
             element: document.getElementById('qr-code'),
             size: 600,
             value: url
           });*/
        }

        _generateUrlForQr = (uuid) => {
            let domain, hostname = $window.location.hostname;
            if (hostname === 'localhost'){
                domain = hostname + ':3334'
            } else {
                domain = hostname;
            }
           return 'https://' + domain + '?qr_uuid='+ uuid;
        }

        $scope.deleteButton = true;

        $scope.removeQr = () => {
            $http({
                method: "DELETE",
                url: `/api/qr/delete/${$scope.qr.uuid}`,
            }).then(response => {
                $('#removeQR').modal('hide');
                if(response.status === 200){
                     $location.path('/qrcontroller');
                }
            }, error => {
                console.log(error);
            });
        }

        $scope.downloadQrCode = () => {
            let a = document.createElement("a"); //Create <a>
            a.href = document.querySelector('#qr-code img').src; //Image Base64 Goes here
            a.download = `${$scope.qr.name}.png`; //File name Here
            a.click();
        }

        $scope.printQrCode = () => {
            function closePrint() {
                if (w) {
                    w.close();
                }
            }
            let imgContent = document.querySelector('#qr-code img');
            let w = window.open();
            w.document.open();
            w.document.write('<html><body onload="window.print()">' + '<img src=' +  imgContent.src + ' style="display: block; margin: 0 auto; "></></html>');
            w.document.close();
            w.onbeforeunload = closePrint;
            w.onafterprint = closePrint;
        }

        sideNavInit.sideNav();
    }]);


