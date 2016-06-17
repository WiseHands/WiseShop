(function () {
    angular.module('sweety', [])
        .controller('ListViewController', function($scope, $http, $window) {
            $scope.logIn = function (){
                var params = {
                    email: $scope.email,
                    password: $scope.password
                };

                var encodedParams = encodeQueryData(params);

                $http({
                    method: 'POST',
                    url: '/signin?' + encodedParams
                })
                    .success(function (data, status, headers, config) {
                        var token = headers("X-AUTH-TOKEN");
                        var userId = data.uuid;
                        
                        if(!token || !userId){
                            $scope.deniedMsg = false;

                            console.error('Token or userID not returned in server response');

                            return;
                        }
                        
                        localStorage.setItem('X-AUTH-USER-ID', userId) ;
                        localStorage.setItem('X-AUTH-TOKEN', token) ;
                        
                        $window.location.href = '/admin';
                    }).
                error(function (data, status) {
                    console.log(JSON.stringify(data));
                    console.log(JSON.stringify(status));
                    $scope.deniedMsg = true;
                    $scope.accessDeniedMessage = data.status;
                });
            };
        })
})();
function encodeQueryData(data)
{
    var ret = [];
    for (var d in data)
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
}