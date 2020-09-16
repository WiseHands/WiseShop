angular.module('WiseHands')
    .controller('QrNewCodeController', ['$scope', '$http', 'signout', 'sideNavInit', 'shared', '$window',
        function ($scope, $http, signout, sideNavInit, shared, $window) {
        $scope.loading = true;

        let qr_input_name = document.querySelector('#qr_name');
        let qr_label_name = document.querySelector('#qr_label');

        $scope.createQrCode = () => {
            console.log('createQrCode input is empty', !qr_input_name.value);
            if(!qr_input_name.value){
                qr_input_name.style.borderBottom = '1px solid red';
                qr_label_name.style.color = 'red';
                return
            }
            let qr = JSON.stringify({name: qr_input_name.value})
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


