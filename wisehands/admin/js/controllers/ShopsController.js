angular.module('WiseHands')
    .controller('ShopsController', ['$scope', '$http', 'sideNavInit', 'signout', function ($scope, $http, sideNavInit, signout) {
        $scope.loading = true;

        sideNavInit.sideNav();


        $http({
          method: 'GET',
          url: '/department'
        })
          .then(function successCallback(response){
            $scope.departments = response.data;
            console.log("in response department", $scope.departments);
          }, function errorCallback(data){
        });

        $http({
            method: 'GET',
            url: '/shop/details',
        })
            .then(function successCallback(response) {
              $scope.activeShop = response.data;
                console.log("in response $scope.activeShop", $scope.activeShop);
            }, function errorCallback(response) {
            });

    }]);
