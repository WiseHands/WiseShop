angular.module('WiseHands')
    .controller('QrNewCodeController', ['$scope', '$http', 'signout', 'sideNavInit', 'shared', '$window',
        function ($scope, $http, signout, sideNavInit, shared, $window) {
        $scope.loading = true;

        let qr_name = document.querySelector('#qr_name');

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
            console.log("url => ", url);
            new QRious({
                element: document.getElementById('qr-code'),
                size: 200,
                value: url
            });
            $window.location.href = `#/qrdetail/${uuid}`;
        }

        _generateUrlForQr = (uuid) => {
            let domain, hostname = $window.location;
            if (hostname === 'localhost'){
                domain = hostname + ':3334'
            } else {
                domain = hostname;
            }
           return 'https://' + domain + '/menu?uuid=' + uuid;
        }

        sideNavInit.sideNav();
    }]);


