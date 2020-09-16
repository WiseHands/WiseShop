angular.module('WiseHands')
    .controller('QrEditCodeController', ['$scope', '$http', 'signout', 'sideNavInit', 'shared', '$window', '$routeParams',
        function ($scope, $http, signout, sideNavInit, shared, $window, $routeParams) {
        $scope.loading = true;

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
            new QRious({
                element: document.getElementById('img-qr-code'),
                size: 200,
                value: url
            });
        }

        _generateUrlForQr = (uuid) => {
            let domain, hostname = $window.location.hostname;
            console.log('hostname', hostname);
            if (hostname === 'localhost'){
                domain = hostname + ':3334'
            } else {
                domain = hostname;
            }
           return 'https://' + domain + '/menu?uuid=' + uuid;
        }

        $scope.editQrCode = () => {
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
        }

        sideNavInit.sideNav();
    }]);


