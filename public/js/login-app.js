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
                    .success(function (data, status, headers) {
                        var token = headers("X-AUTH-TOKEN");
                        var userId = data.uuid;
                        
                        if(!token || !userId){
                            $scope.deniedMsg = false;

                            console.error('Token or userID not returned in server response');

                            return;
                        }
                        


                        if (data.shopList.length === 1){
                            localStorage.setItem('X-AUTH-USER-ID', userId) ;
                            localStorage.setItem('X-AUTH-TOKEN', token) ;

                            var shop = data.shopList[0];
                            var domain = shop.domain;
                            window.location.href = window.location.protocol + '//' + domain + ':' + window.location.port + '/admin' +
                            '?X-AUTH-USER-ID=' + userId + "&X-AUTH-TOKEN="+token;
                        }
                        
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