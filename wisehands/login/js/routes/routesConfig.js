(function () {
    angular.module('WiseHandsMain', [
            'ngRoute'
        ])
        .config(['$routeProvider',
            function ($routeProvider) {

                $routeProvider.
                when('/',{
                    templateUrl:'wisehands/login/partials/main.html',
                    controller:'LoginFormController',
                }).
                when('/login',{
                    templateUrl:'wisehands/login/partials/login-form.html',
                    controller:'LoginFormController',
                }).
                when('/register',{
                    templateUrl:'wisehands/login/partials/register-form.html',
                    controller:'RegisterFormController',
                }).
                when('/emailsignin',{
                    templateUrl:'wisehands/login/partials/login_registerForm.html',
                    controller:'LoginFormController',
                }).
                otherwise({
                    redirectTo:'/'
                });
            }])
})();
