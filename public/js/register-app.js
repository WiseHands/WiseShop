(function (){
    angular.module('sweety', [])
        .controller('RegisterFormController', function($scope, $http, $window) {
            $scope.signIn = function (){
                var params = {
                    email: $scope.email,
                    password: $scope.password,
                    passwordConfirmation: $scope.password,
                    shopName: $scope.shopName,
                    shopID: $scope.shopID,
                    publicLiqPayKey: $scope.publicLiqPay,
                    privateLiqPayKey: $scope.privateLiqPay,
                    clientDomain: $scope.domain

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
        })
})();   
function encodeQueryData(data)
{
    var ret = [];
    for (var d in data)
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
}