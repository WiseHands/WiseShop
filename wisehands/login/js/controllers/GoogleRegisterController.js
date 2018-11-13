angular.module('WiseHandsMain')
    .controller('GoogleRegisterController', ['$scope', '$http', 'userService', function($scope, $http, userService) {
        $scope.user = userService.user;
        $scope.locale = localStorage.getItem('NG_TRANSLATE_LANG_KEY');

        $scope.signIn = function (){
            var params = {
                name: $scope.user.name,
                email: $scope.user.email,
                language: $scope.locale,
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
                    var token = headers("JWT_TOKEN");

                    if (data.shopList.length === 1){
                        localStorage.setItem('JWT_TOKEN', token) ;

                        var shop = data.shopList[0];
                        var domain = shop.domain;
                        window.location.href = window.location.protocol + '//' + domain + ':' + window.location.port + '/admin' +
                            '?JWT_TOKEN=' + token;
                    }

                }).
            error(function (error) {
                $scope.error = error;
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