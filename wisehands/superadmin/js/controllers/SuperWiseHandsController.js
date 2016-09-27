(function(){
    angular.module('SuperWiseHands')
        .controller('SuperWiseHandsController', ['$scope', '$http', '$route', '$location', function($scope, $http, $route, $location) {
            // $http({
            //     method: 'GET',
            //     url: '/shop/details/public'
            // })
            //     .then(function successCallback(response) {
            //         document.title = response.data;
            //         $scope.shopName = response.data;
            //
            //     }, function errorCallback(error) {
            //         console.log(error);
            //     });
            //
            // $scope.reloadPage = function(){
            //     $location.path("/");
            // };
            //
            // $http({
            //     method: 'GET',
            //     url: '/contact/details'
            // })
            //     .then(function successCallback(response) {
            //         $scope.contacts = response.data;
            //         window.init_map($scope.contacts.latLng);
            //     }, function errorCallback(data) {
            //         $scope.status = 'Щось пішло не так...';
            //     });

        });


}])();