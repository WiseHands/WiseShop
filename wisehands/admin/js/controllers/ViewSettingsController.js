angular.module('WiseHands')
    .controller('ViewSettingsController', ['$scope', '$http', 'signout', 'sideNavInit', function ($scope, $http, signout, sideNavInit) {
        $scope.loading = true;
        $http({
            method: 'GET',
            url: '/shop/details',
            headers: {
                'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
            }
        })
            .then(function successCallback(response) {
                $scope.loading = false;
                $scope.shopStyling = response.data.visualSettingsDTO;
            }, function errorCallback(data) {
                $scope.loading = false;
                console.log(data);
                signout.signOut();
            });

        $scope.updateShopStyling = function () {
            $scope.loading = true;
            $http({
                method: 'PUT',
                url: '/visualsettings',
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                },
                data: $scope.shopStyling
            })
                .success(function (response) {
                    $scope.loading = false;
                    $scope.shopStyling = response;
                }).
            error(function (response) {
                if (response.data === 'Invalid X-AUTH-TOKEN') {
                    signout.signOut();
                }
                $scope.loading = false;
                console.log(response);
            });
        };
        $scope.loadImage = function () {
            $('#imageLoader').click();
        };
        

        $scope.imageUpload = function(element){
            $scope.$apply(function() {
                $scope.loading = true;
            });
            var reader = new FileReader();
            reader.onload = $scope.imageIsLoaded;
            reader.readAsDataURL(element.files[0]);
        };

        $scope.imageIsLoaded = function(e){
            $scope.$apply(function() {
                $scope.logo = e.target.result;
                $scope.loading = false;
            });
        };

        $scope.deleteLogo = function(){
                $scope.logo = '';

        };

        sideNavInit.sideNav();
    }]);
