angular.module('WiseHands')
    .controller('AdditionEditController', ['$scope', '$http', 'signout', 'sideNavInit', 'shared', '$window', '$routeParams',
        function ($scope, $http, signout, sideNavInit, shared, $window, $routeParams) {
        $scope.loading = true;

        let qr_input_name = document.querySelector('#qr_name');
        let qr_label_name = document.querySelector('#qr_label');

        $http({
            method: 'GET',
            url: `/api/addition/info/${$routeParams.uuid}`
        }).then(response => {
            console.log(response.data);
            $scope.addition = response.data;
        }, error => {
            console.log(error);
        });


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


