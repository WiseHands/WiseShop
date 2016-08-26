(function () {
    angular.module('WiseHandsMain', [
            'ngRoute'
        ])
        .config(['$routeProvider',
            function ($routeProvider) {

                $routeProvider.
                when('/',{
                    templateUrl:'public/wise_hands/partials/main.html',
                    controller:'LoginFormController',
                }).
                when('/login',{
                    templateUrl:'public/wise_hands/partials/login-form.html',
                    controller:'LoginFormController',
                }).
                when('/register',{
                    templateUrl:'public/wise_hands/partials/register-form.html',
                    controller:'RegisterFormController',
                }).
                when('/emailsignin',{
                    templateUrl:'public/wise_hands/partials/login_registerForm.html',
                    controller:'LoginFormController',
                }).
                otherwise({
                    redirectTo:'/'
                });
            }])
})();
