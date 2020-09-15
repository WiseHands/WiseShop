angular.module('WiseHands')
    .controller('QrDetailController', ['$scope', '$http', 'signout', 'sideNavInit', 'shared', '$routeParams', '$location', '$window',
        function ($scope, $http, signout, sideNavInit, shared, $routeParams, $location, $window) {

        console.log('location => ', $location);

        $http({
            method: 'GET',
            url: `/api/qr/info/${$routeParams.uuid}`
        }).then(response => {
            console.log(response);
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
           new QRious({
             element: document.getElementById('qr-code'),
             size: 200,
             value: url
           });
        }

        $scope.createQrCode = () => {
            console.log('$scope.qr.name', $scope.qr.name);
             let url = _generateUrlForQr($scope.qr.name);
             new QRious({
                 element: document.getElementById('qr-code'),
                 size: 200,
                 value: url
             });
        }

        _generateUrlForQr = (uuid) => {
            let domain, hostname = $window.location.hostname;
            if (hostname === 'localhost'){
                domain = hostname + ':3334'
            } else {
                domain = hostname;
            }
           return 'https://' + domain + '/menu?uuid='+ uuid;
        }

        $scope.saveQRCode = () => {
            let qr = JSON.stringify($scope.qr);
            $http({
                method: "PUT",
                url: `/api/qr/save`,
                data: qr
            }).then(response => {
                console.log(response);
            }, error => {
                console.log(error);
            });
        }

        $scope.deleteButton = true;

        $scope.removeQr = () => {
        console.log('removeQr');
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

        sideNavInit.sideNav();
    }]);


