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
            printQR($scope.qr);
        }, error => {
            console.log(error);
        });

        $scope.redirectToEdit = () => {
            $window.location.href = `#/qredit/${$routeParams.uuid}`;
        }

        showQR = qrCode => {
            let url = _generateUrlForQr(qrCode.uuid);
            let options = {
                text: url,
                width: 200,
                height: 200,
                colorDark: "#0e2935",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H,
                quietZone: 8,
                quietZoneColor: 'transparent',
                logo: "wisehands/assets/images/main_logo_black.png",
                logoBackgroundTransparent: false,
                title: 'wstore.pro',
                titleColor: "#0e2935",
                titleFont: "bold 16px Roboto,sans-serif",
                titleHeight: 40,
                titleTop: 30,
                tooltip: url,
                drawer: 'canvas'
            };
            new QRCode(document.getElementById('qr-code'), options);
        }

        _generateUrlForQr = uuid => {
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
            let downloadLink = document.createElement("a");
            downloadLink.href = document.querySelector('#qr-code img').src;
            downloadLink.download = `${$scope.qr.name}.png`;
            downloadLink.click();
        }

        printQR = qrCode => {
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
            titleHeight: 50,
            titleTop: 30,
            tooltip: url,
            drawer: 'canvas'
        };
            new QRCode(document.getElementById('printQr'), options);
        }

        $scope.printQrCode = () => {
            function closePrint() {
                if (printingWindow) {
                    printingWindow.close();
                }
            }
            let imgContent = document.querySelector('#printQr img');
            let printingWindow = window.open();
            printingWindow.document.open();
            printingWindow.document.write('<html><body onload="window.print()">' + '<img src=' +  imgContent.src + ' style="display: block; margin: 0 auto; "></></html>');
            printingWindow.document.close();
            printingWindow.onbeforeunload = closePrint;
            printingWindow.onafterprint = closePrint;
        }

        sideNavInit.sideNav();
    }]);


