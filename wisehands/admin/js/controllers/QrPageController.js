angular.module('WiseHands')
    .controller('QrPageController', ['$scope', '$http', 'signout', 'sideNavInit', 'shared',
        function ($scope, $http, signout, sideNavInit, shared) {



        sideNavInit.sideNav();
    }]);


