angular.module('WiseHands')
    .controller('QrDetailController', ['$scope', '$http', 'signout', 'sideNavInit', 'shared', '$routeParams', '$location',
        function ($scope, $http, signout, sideNavInit, shared, $routeParams, $location) {

        $http({
            method: 'GET',
            url: '/shop/details',
        })
           .then((response) =>{
              $scope.shop = response.data;
           }, (error) => {
               console.log(error);
        });

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
            let domain;
            if ($scope.shop.domain === 'localhost'){
                domain = $scope.shop.domain + ':3334'
            } else {
                domain = $scope.shop.domain;
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
                if(response.status === 200){
                     $location.path('/qrcontroller');
                }
            }, error => {
                console.log(error);
            });
        }

        sideNavInit.sideNav();
    }]);


