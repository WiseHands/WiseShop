angular.module('WiseHands')
    .controller('ProductListController', function ($scope, $http, spinnerService, sideNavInit, signout) {

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
       
    });