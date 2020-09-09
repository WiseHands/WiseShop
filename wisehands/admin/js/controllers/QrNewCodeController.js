angular.module('WiseHands')
    .controller('QrNewCodeController', ['$scope', '$http', 'signout', 'sideNavInit', 'shared',
        function ($scope, $http, signout, sideNavInit, shared) {
        $scope.loading = true;

        $http({
            method: 'GET',
            url: '/shop/details',
        })
           .then((response) =>{
              $scope.shop = response.data;
               console.log("$scope.shop", response);
               createDefaultQRForShop(response.data);
           }, (error) => {
               console.log(error);
               $scope.loading = false;
        });

        createDefaultQRForShop = (shop) => {
        console.log('shop name => ', shop.shopName)
         $scope.isQrPresent = true;
            let qr = new QRious({
                 element: document.getElementById('qr-code'),
                 size: 200,
                 value: shop.shopName
            });
        }

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
             let qr_name = document.querySelector('#qr_name').value;
             let url = generateUrl();
             console.log('url => ', url);
             let qr = new QRious({
                 element: document.getElementById('qr-code'),
                 size: 200,
                 value: url
             });

             console.log('qr = ', qr);
        }

        generateUrl = () => {
            let domain;
            if ($scope.shop.domain === 'localhost'){
                domain = $scope.shop.domain + ':3334'
            } else {
                domain = $scope.shop.domain;
            }
           return 'https://' + domain + '/menu'
        }

        $scope.saveQRCode = () => {

        }

        sideNavInit.sideNav();
    }]);


