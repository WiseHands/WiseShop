angular.module('WiseHands')
    .controller('AdditionMenuController', ['$scope', '$http', 'signout', 'sideNavInit', 'shared', '$window',
        function ($scope, $http, signout, sideNavInit, shared, $window) {

        $http({
            method: 'GET',
            url: 'api/addition/list',
        })
           .then((response) =>{
               if (response.data){
                  $scope.additionList = response.data;
                  console.log($scope.additionList);
               }
           }, (error) => {
               console.log(error);
               $scope.loading = false;
        });

        sideNavInit.sideNav();
    }]);


