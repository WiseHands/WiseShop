angular.module('WiseHands')
    .controller('QrMenuController', ['$scope', '$http', 'signout', 'sideNavInit', 'shared',
        function ($scope, $http, signout, sideNavInit, shared) {

        $http({
            method: 'GET',
            url: '/shop/details',
        })
           .then((response) =>{
              $scope.shop = response.data;
              if(!$scope.shop.qrList){
               console.log("$scope.shop.qrList", false);
              }
               console.log("$scope.shop", response);
           }, (error) => {
               console.log(error);
               $scope.loading = false;
        });

        sideNavInit.sideNav();
    }]);


