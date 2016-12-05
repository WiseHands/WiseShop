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
                $scope.activeShop = localStorage.getItem('activeShop');
                if ($scope.shopStyling.shopLogo === '' || !$scope.shopStyling.shopLogo){
                    $scope.logo = '';
                } else {
                    $scope.logo = 'public/shop_logo/' + $scope.activeShop + '/' + $scope.shopStyling.shopLogo;

                }
                if(!$scope.shopStyling.sidebarColorScheme){
                    $scope.selectedSkin = $scope.navbarStyles[0];
                } else {
                    $scope.navbarStyles.forEach(function(style){
                        if(style.code === $scope.shopStyling.sidebarColorScheme.code){

                            $scope.selectedSkin = style;
                        }
                    })

                }

            }, function errorCallback(data) {
                $scope.loading = false;
                console.log(data);
                signout.signOut();
            });


        $scope.navbarStyles = [
            {
                name: 'Синій',
                code: 'blue',
                navbarColor: '#072e6e',
                navbarTextColor: '#fff'
            },
            {
                name: 'Червоний',
                code: 'red',
                navbarColor: '#900',
                navbarTextColor: '#fff'
            },
            {
                name: 'Зелений',
                code: 'green',
                navbarColor: '#003830',
                navbarTextColor: '#fff'
            },
            {
                name: 'Фіолетовий',
                code: 'purple',
                navbarColor: '#54057d',
                navbarTextColor: '#fff'
            },
            {
                name: 'Темний',
                code: 'dark',
                navbarColor: '#3b3b3b',
                navbarTextColor: '#fff'
            },
            {
                name: 'Сірий',
                code: 'grey',
                navbarColor: '#565d6b',
                navbarTextColor: '#fff'
            },
            {
                name: 'Блакитний',
                code: 'mdb',
                navbarColor: '#3f729b',
                navbarTextColor: '#fff'
            },
            {
                name: 'Оранжевий',
                code: 'deep-orange',
                navbarColor: '#8a1a00',
                navbarTextColor: '#fff'
            },
            {
                name: 'Графіт',
                code: 'graphite',
                navbarColor: '#37474f',
                navbarTextColor: '#fff'
            },
            {
                name: 'Рожевий',
                code: 'pink',
                navbarColor: '#ab1550',
                navbarTextColor: '#fff'
            },
            {
                name: 'Світло-сірий',
                code: 'light-grey',
                navbarColor: '#686868',
                navbarTextColor: '#fff'
            }
        ];

        $scope.navbarStyling = function (selectedSkin) {
            $scope.navbarStyles.forEach(function(style) {
                if(!selectedSkin){
                    return;
                }
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
                    $scope.navbarStyles.forEach(function(skin) {
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
        $scope.loadFavicon = function () {
            $('#favIconLoader').click();
        };
        

        $scope.imageUpload = function(element){
            $scope.$apply(function() {
                $scope.loading = true;
            });
            var reader = new FileReader();
            reader.onload = $scope.imageIsLoaded;
            reader.readAsDataURL(element.files[0]);
        };

        $scope.favIconUpload = function(element){
            $scope.$apply(function() {
                $scope.loading = true;
            });
            var reader = new FileReader();
            reader.onload = $scope.faviconIsLoaded;
            reader.readAsDataURL(element.files[0]);
        };

        $scope.addLogo = function () {
            var logoFd = new FormData();
                logoFd.append('logo', $scope.logoBlob);
            $http.put('/visualsettings/logo', logoFd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined,
                        'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                        'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                    }
                })
                .success(function(response){
                    $scope.loading = false;
                })
                .error(function(response){
                    if (response.data === 'Invalid X-AUTH-TOKEN') {
                        signout.signOut();
                    }
                    $scope.loading = false;
                    console.log(response);
                });
        };

        $scope.addFavicon = function () {
            var faviconFd = new FormData();
            faviconFd.append('favicon', $scope.faviconBlob);
            $http.put('/visualsettings/favicon', faviconFd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined,
                        'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                        'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                    }
                })
                .success(function(response){
                    $scope.shopStyling = response;
                    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
                    link.type = 'image/x-icon';
                    link.rel = 'shortcut icon';
                    link.href = 'public/shop_logo/' + $scope.activeShop + '/' + response.shopFavicon;
                    document.getElementsByTagName('head')[0].appendChild(link);
                    $scope.loading = false;
                })
                .error(function(response){
                    if (response.data === 'Invalid X-AUTH-TOKEN') {
                        signout.signOut();
                    }
                    $scope.loading = false;
                    console.log(response);
                });
        };

        $scope.imageIsLoaded = function(e){
            $scope.$apply(function() {
                $scope.logo = e.target.result;
                $scope.logoBlob = dataURItoBlob($scope.logo);
                $scope.addLogo();
                $scope.loading = false;
            });
        };
        $scope.faviconIsLoaded = function(e){
            $scope.$apply(function() {
                $scope.favicon = e.target.result;
                $scope.faviconBlob = dataURItoBlob($scope.favicon);
                $scope.addFavicon();
                $scope.loading = false;
            });
        };

        $scope.deleteLogo = function(){
            $scope.loading = true;
            $http({
                method: 'DELETE',
                url: '/visualsettings/logo',
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                }
            })
                .then(function successCallback(response) {
                    $scope.logo = '';
                    $scope.loading = false;
                }, function errorCallback(response) {
                    if (response.data === 'Invalid X-AUTH-TOKEN') {
                        signout.signOut();
                    }
                    $scope.loading = false;
                    console.log(response);
                });

        };
        $scope.deleteFavicon = function(){
            $scope.loading = true;
            $http({
                method: 'DELETE',
                url: '/visualsettings/favicon',
                headers: {
                    'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                    'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
                }
            })
                .then(function successCallback(response) {
                    $scope.shopStyling = response.data;
                    var head = document.getElementsByTagName('head')[0];
                    var linkIcon = document.querySelector("link[rel*='icon']");
                    head.removeChild(linkIcon);
                    $scope.loading = false;
                }, function errorCallback(response) {
                    if (response.data === 'Invalid X-AUTH-TOKEN') {
                        signout.signOut();
                    }
                    $scope.loading = false;
                    console.log(response);
                });

        };

        sideNavInit.sideNav();
    }]);

function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
}
