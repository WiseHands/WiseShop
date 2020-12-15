angular.module('WiseHands')
    .controller('QrEditCodeController', ['$scope', '$http', 'signout', 'sideNavInit', 'shared', '$window', '$routeParams',
        function ($scope, $http, signout, sideNavInit, shared, $window, $routeParams) {
        $scope.loading = true;

        let qr_input_name = document.querySelector('#qr_name');
        let qr_label_name = document.querySelector('#qr_label');

        $http({
            method: 'GET',
            url: `/api/qr/info/${$routeParams.uuid}`
        }).then(response => {
            console.log(response.data);
            $scope.qr = response.data;
            showQR($scope.qr.uuid);
        }, error => {
            console.log(error);
        });

        showQR = (uuid) => {
            let url = _generateUrlForQr(uuid);
            console.log("url => ", url);
            let options = {
                text: url,
                width: 175,
                height: 175,
                colorDark: "#0e2935",
                correctLevel: QRCode.CorrectLevel.H,
                quietZone: 5,
                quietZoneColor: 'transparent',
                tooltip: url,
                drawer: 'canvas'
            };
           new QRCode(document.getElementById('img-qr-code'), options);
/*            new QRious({
                element: document.getElementById('img-qr-code'),
                size: 175,
                value: url
            });*/
        };

        _generateUrlForQr = (uuid) => {
            let domain, hostname = $window.location.hostname;
            console.log('hostname', hostname);
            if (hostname === 'localhost'){
                domain = hostname + ':3334'
            } else {
                domain = hostname;
            }
           return 'https://' + domain + '/?qr_uuid='+ uuid;
        };

        $scope.editQrCode = () => {
            if(!qr_input_name.value){

                qr_input_name.style.borderBottom = '1px solid red';
                qr_label_name.style.color = 'red';
                return
            }
            $http({
                method: "PUT",
                url: `/api/qr/edit/${$routeParams.uuid}`,
                data: JSON.stringify($scope.qr)
            }).then(response => {
                $window.location.href = `#/qrcontroller`;
                console.log(response);
            }, error => {
                console.log(error);
            });
        };

        sideNavInit.sideNav();
    }]);


