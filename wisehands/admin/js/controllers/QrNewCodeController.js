angular.module('WiseHands')
    .controller('QrNewCodeController', ['$scope', '$http', 'signout', 'sideNavInit', 'shared',
        function ($scope, $http, signout, sideNavInit, shared) {
        $scope.loading = true;

        $http({
            method: 'GET',
            url: '/shop/details',
        })
           .then((response) =>{
              let shopDetail = response.data;
               console.log("$scope.shop", response);
           }, (error) => {
               console.log(error);
               $scope.loading = false;
        });

        function generateQRCode() {
            var qrtext = document.getElementById("qr-text").value;

            alert(qrtext);
            qr.set({
                foreground: 'black',
                size: 200,
                value: qrtext
            });
        }
        $scope.isQrPresent = false;
        $scope.createQrCode = () => {
             let qr_name = document.querySelector('#table_name').value;
             let table_area = document.querySelector('#table_area').value;
             let table_number = document.querySelector('#table_number').value;
             let table_discount = document.querySelector('#table_discount').value;
             let qrData = {
                qrName: qr_name,
                tableArea: table_area,
                tableNumber: table_number,
                table_discount: table_discount
             }
             let qr = new QRious({
                 element: document.getElementById('qr-code'),
                 size: 200,
                 value: qr_name
             });
        $scope.isQrPresent = true;
             console.log('qr = ', qr);
        }



        sideNavInit.sideNav();
    }]);


