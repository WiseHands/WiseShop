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
                $scope.shopStyling.sidebarColorSchemes.forEach(function(skin) {
                    if (skin.code === $scope.shopStyling.sidebarColorScheme.code){
                        $scope.selectedSkin = skin;
                    }
                });
            }, function errorCallback(data) {
                $scope.loading = false;
                console.log(data);
                signout.signOut();
            });

        $scope.navbarStyles = [
            {
                code: 'blue',
                navbarColor: '#072e6e',
                navbarTextColor: '#fff'
            },
            {
                code: 'red',
                navbarColor: '#900',
                navbarTextColor: '#fff'
            },
            {
                code: 'green',
                navbarColor: '#003830',
                navbarTextColor: '#fff'
            },
            {
                code: 'purple',
                navbarColor: '#54057d',
                navbarTextColor: '#fff'
            },
            {
                code: 'dark',
                navbarColor: '#3b3b3b',
                navbarTextColor: '#fff'
            },
            {
                code: 'grey',
                navbarColor: '#565d6b',
                navbarTextColor: '#fff'
            },
            {
                code: 'mdb',
                navbarColor: '#3f729b',
                navbarTextColor: '#fff'
            },
            {
                code: 'deep-orange',
                navbarColor: '#8a1a00',
                navbarTextColor: '#fff'
            },
            {
                code: 'graphite',
                navbarColor: '#37474f',
                navbarTextColor: '#fff'
            },
            {
                code: 'pink',
                navbarColor: '#ab1550',
                navbarTextColor: '#fff'
            },
            {
                code: 'light-grey',
                navbarColor: '#686868',
                navbarTextColor: '#fff'
            }
        ];

        $scope.navbarStyling = function (selectedSkin) {
            $scope.navbarStyles.forEach(function(style) {
                if (style.code === selectedSkin.code){
                    $scope.shopStyling.navbarColor = style.navbarColor;
                    $scope.shopStyling.navbarTextColor = style.navbarTextColor;
                }

            })
        };


        $scope.updateShopStyling = function () {
            $scope.loading = true;
            $scope.shopStyling.sidebarColorScheme = $scope.selectedSkin;
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
                    $scope.shopStyling.sidebarColorSchemes.forEach(function(skin) {
                        if (skin.code === $scope.shopStyling.sidebarColorScheme.code){
                            $scope.selectedSkin = skin;
                        }
                    });
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
