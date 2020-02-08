angular.module('WiseHands')
    .controller('ViewSettingsController', ['$scope', '$http', 'signout', 'sideNavInit', function ($scope, $http, signout, sideNavInit) {
        $scope.loading = true;
        $http({
            method: 'GET',
            url: '/shop/details',
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
                // signout.signOut();
            });

        $scope.navbarStyles = [
            {
                name: 'Blue',
                code: 'blue',
                navbarColor: '#072e6e',
                navbarTextColor: '#fff'
            },
            {
                name: 'Red',
                code: 'red',
                navbarColor: '#900',
                navbarTextColor: '#fff'
            },
            {
                name: 'Green',
                code: 'green',
                navbarColor: '#003830',
                navbarTextColor: '#fff'
            },
            {
                name: 'Purple',
                code: 'purple',
                navbarColor: '#54057d',
                navbarTextColor: '#fff'
            },
            {
                name: 'Dark',
                code: 'dark',
                navbarColor: '#3b3b3b',
                navbarTextColor: '#fff'
            },
            {
                name: 'Grey',
                code: 'grey',
                navbarColor: '#565d6b',
                navbarTextColor: '#fff'
            },
            {
                name: 'Sky-Blue',
                code: 'mdb',
                navbarColor: '#3f729b',
                navbarTextColor: '#fff'
            },
            {
                name: 'Deep-Orange',
                code: 'deep-orange',
                navbarColor: '#8a1a00',
                navbarTextColor: '#fff'
            },
            {
                name: 'Graphite',
                code: 'graphite',
                navbarColor: '#37474f',
                navbarTextColor: '#fff'
            },
            {
                name: 'Pink',
                code: 'pink',
                navbarColor: '#ab1550',
                navbarTextColor: '#fff'
            },
            {
                name: 'Light-Grey',
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
                data: $scope.shopStyling
            })
                .success(function (response) {
                    console.log("response for footer: ", response);
                    $scope.loading = false;
                    $scope.shopStyling = response;
                    $scope.navbarStyles.forEach(function(skin) {
                        if (skin.code === $scope.shopStyling.sidebarColorScheme.code){
                            $scope.selectedSkin = skin;
                        }
                    });
                    showInfoMsg("SAVED");
                }).
            error(function (response) {
                $scope.loading = false;
                console.log(response);
                showWarningMsg("ERROR");
            });
        };
        $scope.loadImage = function () {
            $('#imageLoader').click();
        };
        $scope.loadFavicon = function () {
            $('#favIconLoader').click();
        };
        

        $scope.imageUpload = function(e){
            $scope.$apply(function() {
                $scope.loading = true;
            });
            var file  = e.files[0];
            var reader = new FileReader();
            reader.onloadend = $scope.imageIsLoaded;
            if (file && file.type.match('image.*')) {
                reader.readAsDataURL(e.files[0]);
            } else {
                $scope.$apply(function() {
                    $scope.loading = false;
                });
            }
        };

        $scope.favIconUpload = function(e){
            $scope.$apply(function() {
                $scope.loading = true;
            });
            var file  = e.files[0];
            var reader = new FileReader();
            reader.onloadend = $scope.faviconIsLoaded;
            if (file && file.type.match('image.*')) {
                reader.readAsDataURL(e.files[0]);
            } else {
                $scope.$apply(function() {
                    $scope.loading = false;
                });
            }
        };

        $scope.addLogo = function () {
            var logoFd = new FormData();
                logoFd.append('logo', $scope.logoBlob);
            $http.put('/visualsettings/logo', logoFd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined,
                    }
                })
                .success(function(response){
                    $scope.loading = false;
                })
                .error(function(response){
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
            })
                .then(function successCallback(response) {
                    $scope.logo = '';
                    $scope.loading = false;
                }, function errorCallback(response) {
                    $scope.loading = false;
                    console.log(response);
                });

        };
        $scope.deleteFavicon = function(){
            $scope.loading = true;
            $http({
                method: 'DELETE',
                url: '/visualsettings/favicon',
            })
                .then(function successCallback(response) {
                    $scope.shopStyling = response.data;
                    var head = document.getElementsByTagName('head')[0];
                    var linkIcon = document.querySelector("link[rel*='icon']");
                    head.removeChild(linkIcon);
                    $scope.loading = false;
                }, function errorCallback(response) {
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
function showWarningMsg(msg) {
    toastr.clear();
    toastr.options = {
        "positionClass": "toast-bottom-right",
        "preventDuplicates": true
    };
    toastr.warning(msg);
}
function showInfoMsg(msg) {
    toastr.clear();
    toastr.options = {
        "positionClass": "toast-bottom-right",
        "preventDuplicates": true
    };
    toastr.info(msg);
}