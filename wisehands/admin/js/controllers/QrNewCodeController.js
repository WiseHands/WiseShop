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
                $window.location.href = `#/qrdetail/${response.data.uuid}`
            }, error => {
                console.log(error);
            });
        }

        sideNavInit.sideNav();
    }]);


