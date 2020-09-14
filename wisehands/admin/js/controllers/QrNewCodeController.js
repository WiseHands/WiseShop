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
           }, (error) => {
               console.log(error);
               $scope.loading = false;
        });

        $scope.createQrCode = () => {
            let qr = JSON.stringify({name: qr_name.value})
            $http({
                method: "PUT",
                url: `/api/qr/create`,
                data: qr
            }).then(response => {
                showQR(response.data.uuid);
                console.log(response);
            }, error => {
                console.log(error);
            });
        }

        showQR = (uuid) => {
            let url = _generateUrlForQr(uuid);
            new QRious({
                element: document.getElementById('qr-code'),
                size: 200,
                value: url
            });
        }

        _generateUrlForQr = (uuid) => {
            let domain;
            if ($scope.shop.domain === 'localhost'){
                domain = $scope.shop.domain + ':3334'
            } else {
                domain = $scope.shop.domain;
            }
           return 'https://' + domain + '/menu?uuid=' + uuid;
        }

        sideNavInit.sideNav();
    }]);


