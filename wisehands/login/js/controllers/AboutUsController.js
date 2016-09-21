angular.module('WiseHandsMain')
    .controller('AboutUsController', function($scope, $http, userService) {

        $scope.initMap = function () {
            var mapDiv = document.getElementById('map');
            var initialized = mapDiv && window.google;

            if(!initialized) {
                return;
            }
            var myLatLng = {lat: 49.843232, lng: 24.031540};
            var map = new google.maps.Map(mapDiv, {
                center: myLatLng,
                zoom: 18
            });
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: 'Wise Hands'
            });
        };
        $scope.initMap();
    });





