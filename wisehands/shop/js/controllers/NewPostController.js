(function(){
    angular.module('WiseShop')
        .controller('NewPostController', ['$scope', '$http', function($scope, $http) {
           $scope.newPostChange = function () {
               if ($scope.newPostAutocomplete.formatted_address){
                   $scope.markers = [];
                   $scope.lat = $scope.newPostAutocomplete.geometry.location.lat();
                   $scope.lng = $scope.newPostAutocomplete.geometry.location.lng();
                   var latLng = [];
                   latLng.push($scope.lat);
                   latLng.push($scope.lng);
                   latLng.push($scope.newPostAutocomplete.formatted_address);
                   $scope.markers.push(latLng);
                   init_map2($scope.markers);
               }
           };
            $scope.getClosestDepartments = function () {
                $scope.loading = true;
                $http({
                    method: 'GET',
                    url: '/novaposhta?lat=' + $scope.lat + '&lon=' + $scope.lng
                })
                    .then(function successCallback(response) {
                        $scope.loading = false;
                        debugger;
                    }, function errorCallback(data) {
                        $scope.loading = false;
                        console.log(data);
                    });
            }
        }]);


})();
function init_map2(latLng) {

    var markers = latLng;
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };

    map = new google.maps.Map(document.getElementById("map-container2"), mapOptions);
    map.setTilt(45);

    for(var  i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][0], markers[i][1]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][2]
        });

        map.fitBounds(bounds);
        map.panToBounds(bounds);
    }
    new WOW().init();

}
