angular.module('WiseHands')
    .controller('QrNewCodeController', ['$scope', '$http', 'signout', 'sideNavInit', 'shared',
        function ($scope, $http, signout, sideNavInit, shared) {

        function generateQRCode() {
            var qrtext = document.getElementById("qr-text").value;

            alert(qrtext);
            qr.set({
                foreground: 'black',
                size: 200,
                value: qrtext
            });
        }

        $scope.createQrCode = () => {
             let qrtext = document.querySelector('#table_name').value;

             let qr = new QRious({
                 element: document.getElementById('qr-code'),
                 size: 200,
                 value: qrtext
             });

//             qr.set({
//                 foreground: 'black',
//                 size: 200,
//                 value: qrtext
//             });
        }

        sideNavInit.sideNav();
    }]);


