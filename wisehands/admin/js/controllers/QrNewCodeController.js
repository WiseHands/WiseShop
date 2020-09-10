angular.module('WiseHands')
    .controller('QrNewCodeController', ['$scope', '$http', 'signout', 'sideNavInit', 'shared',
        function ($scope, $http, signout, sideNavInit, shared) {
        $scope.loading = true;

        let qr_name = document.querySelector('#qr_name');

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
            let qr = new QRious({
                 element: document.getElementById('qr-code'),
                 size: 200,
                 value: 'https://' + shop.domain + '/shop'
            });
        }

        $scope.createQrCode = () => {
             let url = _generateUrlForQr(qr_name.value);
             $scope.qr = new QRious({
                 element: document.getElementById('qr-code'),
                 size: 200,
                 value: url
             });

             console.log('url => ', url);
             console.log('qr = ', $scope.qr.toDataURL());
        }

        _generateUrlForQr = (name) => {
            let domain;
            if ($scope.shop.domain === 'localhost'){
                domain = $scope.shop.domain + ':3334'
            } else {
                domain = $scope.shop.domain;
            }
           return 'https://' + domain + '/menu?qrName='+ name;
        }

        $scope.saveQRCode = () => {
            console.log("qr_name.value.toString()", qr_name.value)
            let url = _generateUrlForQr(qr_name.value);
            let qr = JSON.stringify({name: qr_name.value, url: url})
            $http({
                method: "PUT",
                url: `/api/qr/create`,
                data: qr
            }).then(response => {
                console.log(response);
            }, error => {
                console.log(error);
            });
        }

        sideNavInit.sideNav();
    }]);


