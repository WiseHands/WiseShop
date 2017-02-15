    angular.module('WiseHandsMain')
        .controller('RegisterFormController', ['$scope', '$http', 'userService', function($scope, $http, userService) {
            $scope.user = userService.user;

            $scope.signIn = function (){
                var params = {
                    name: $scope.user.name,
                    email: $scope.user.email,
                    password: $scope.password,
                    phone: $scope.phone,
                    shopName: $scope.shopName,
                    passwordConfirmation: $scope.password,
                    clientDomain: $scope.domain + '.' + document.domain
                };

                var encodedParams = encodeQueryData(params);

                $http({
                    method: 'POST',
                    url: '/signup?' + encodedParams
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
                error(function (error) {
                    console.log(error);
                });
            };
        }]);
function encodeQueryData(data)
{
    var ret = [];
    for (var d in data)
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
}