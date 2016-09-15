angular.module('WiseHands')
    .controller('ProductListController', function ($scope, $http, $route, spinnerService, signout, sideNavInit) {
        $scope.$route = $route;

        $scope.activeShop = {
            domain: '',
            shopName: ''
        };
        
        $scope.getResource = function () {
            spinnerService.show('mySpinner');
        $http({
            method: 'GET',
            url: '/products'
        })
            .then(function successCallback(response) {

                spinnerService.hide('mySpinner');
                var data = response.data;
                if(data.length === 0) {
                    $scope.status = 'Товари відсутні';
                } else {
                    $scope.products = response.data;
                }
            }, function errorCallback(data) {
                spinnerService.hide('mySpinner');
                $scope.status = 'Щось пішло не так...';
            });
        };

        $http({
            method: 'GET',
            url: '/shop/details',
            headers: {
                'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
                'X-AUTH-USER-ID': localStorage.getItem('X-AUTH-USER-ID')
            }
        })
            .then(function successCallback(response) {
                $scope.activeShop = response.data;

            }, function errorCallback(response) {
                if (response.data === 'Invalid X-AUTH-TOKEN') {
                    signout.signOut();
                }
                $scope.status = 'Щось пішло не так...';
            });

        $scope.getUrl = function (shop) {
            return  window.location.protocol + '//' + shop.domain + ':' + window.location.port;
        };
        $scope.signOut = signout.signOut;
        sideNavInit.sideNav();

        function equalizeHeights(selector) {
            var heights = new Array();

            $(selector).each(function() {

                $(this).css('min-height', '0');
                $(this).css('max-height', 'none');
                $(this).css('height', 'auto');

                heights.push($(this).height());
            });

            var max = Math.max.apply( Math, heights );

            $(selector).each(function() {
                $(this).css('height', max + 'px');
            });
        }
        $scope.search = function (product) {
            if (!$scope.query){
                return true;
            }
            var searcText = $scope.query.toLowerCase();
            var lowerCaseName = product.name.toLowerCase();
            var total = product.price.toString();
            return lowerCaseName.indexOf(searcText) != -1 || total.indexOf(searcText) !== -1;

        };
        
        $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
            equalizeHeights(".fixed-height");

            $(window).resize(function() {

                setTimeout(function() {
                    equalizeHeights(".fixed-height");
                }, 120);
            });
        });
        $scope.profile = JSON.parse(localStorage.getItem('profile'));
        $scope.getProfileImage = function () {
            if ($scope.profile.profileUrl) {
                return $scope.profile.profileUrl;
            } else {
                return '/wisehands/assets/images/onerror_image/onerror_image_white.png';
            }
        };
    });