    angular.module('WiseHandsMain')
        .controller('RegisterFormController', ['$scope', '$http', 'userService', function($scope, $http, userService) {
            $scope.user = userService.user;
            $scope.locale = localStorage.getItem('NG_TRANSLATE_LANG_KEY');
            $scope.smsVerified = false;
            $scope.verifyPhone = function (phone) {
                $http({
                    method: 'GET',
                    url: '/sendverificationsms?phoneNumber=' + phone
                })
                    .success(function () {
                        $scope.smsVerified = true;
                    }).
                error(function (error) {
                    $scope.error = error;
                    console.log(error);
                });
            };

            $scope.verifySmsCode = function (smscode, $event) {
                if ($event.stopPropagation) $event.stopPropagation();
                if ($event.preventDefault) $event.preventDefault();
                $event.cancelBubble = true;
                $event.returnValue = false;
                $http({
                    method: 'GET',
                    url: '/verifycode?code=' + smscode
                })
                    .success(function (data) {
                        $scope.smscodeVerified = true;
                    }).
                error(function (error) {
                    $scope.codeError = error.reason;
                    console.log(error);
                });
            };

            $scope.signIn = function (){
                $scope.passError = false;
                var params = {
                    name: $scope.user.name,
                    email: $scope.user.email,
                    language: $scope.locale,
                    password: $scope.password,
                    phone: $scope.phone,
                    shopName: $scope.shopName,
                    passwordConfirmation: $scope.confirmPassword,
                    clientDomain: $scope.domain + '.' + document.domain,
                    smsCode: $scope.smsCode
                };
                var encodedParams = encodeQueryData(params);
                
                if($scope.password !== $scope.confirmPassword) {
                    $scope.passError = true;
                } else {
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
                            $scope.regError = error;
                            console.log(error);
                        });

                }

            };
        }]);
function encodeQueryData(data)
{
    var ret = [];
    for (var d in data)
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
}