angular.module('WiseHands')
    .controller('PageQRController', ['$scope', '$http', 'signout', 'sideNavInit', 'shared',
        function ($scope, $http, signout, sideNavInit, shared) {



        sideNavInit.sideNav();
    }]);


