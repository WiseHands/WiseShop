angular.module('WiseHands')
    .controller('QrMenuController', ['$scope', '$http', 'signout', 'sideNavInit', 'shared',
        function ($scope, $http, signout, sideNavInit, shared) {

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

        $http({
            method: 'GET',
            url: 'api/qr/list',
        })
           .then((response) =>{
               if (response.data){
                  $scope.qrList = response.data;
               }
           }, (error) => {
               console.log(error);
               $scope.loading = false;
        });

         _generateUrlForQr = (uuid) => {
            let domain;
            if ($scope.shop.domain === 'localhost'){
                domain = $scope.shop.domain + ':3334'
            } else {
                domain = $scope.shop.domain;
            }
           return 'https://' + domain + '/menu?uuid=' + uuid;
         }

        setQrCode = (qrList) => {
            qrList.forEach((item) => {
                let url = _generateUrlForQr(item.uuid);
                let qr = new QRious({
                    element: document.getElementById(item.uuid),
                    size: 150,
                    value: url
                });
            });
        }


        $scope.$on('ngRepeatFinished', () => { setQrCode($scope.qrList); });

        sideNavInit.sideNav();
    }]);


