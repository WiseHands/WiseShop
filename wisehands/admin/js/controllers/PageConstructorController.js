angular.module('WiseHands')
    .controller('PageConstructorController', ['$scope', '$http', 'signout', '$routeParams', 'sideNavInit',
                function ($scope, $http, signout, $routeParams, sideNavInit) {
        $scope.loading = true;
        sideNavInit.sideNav();
                    $scope.loading = false;

        $http({
            method: 'GET',
            url: '/pageconstructor'
        })
            .then(function successCallback(response) {

                response.data.forEach(item => {
                   let backGroundImageIndex = Math.floor(Math.random() * 10) + 1;
                   let imageUrl =  "/wisehands/assets/images/pages-bg/pagebg" +backGroundImageIndex+ ".jpg";
                    item.imageUrl = imageUrl;
                });

                $scope.pagesList = response.data;
                console.log("GET response.data: ", response.data);
                $scope.loading = false;
            }, function errorCallback(response) {
                console.log("GET response.data error: ", response);

                $scope.loading = false;
            });




                    // end of some code for coupons
    }]);
