angular.module('WiseHands')
    .controller('SelectAdditionsController', ['$scope', '$http', 'signout', 'sideNavInit', 'shared', '$routeParams', '$location', '$window',
        function ($scope, $http, signout, sideNavInit, shared, $routeParams, $location, $window) {

        console.log('$routeParams => ', $routeParams.productUuid);
        let isAdditionDefault = document.querySelector('#additionDefault');

        $http({
            method: 'GET',
            url: `/api/product/${$routeParams.productUuid}`
        }).then(response => {
            console.log('product', response);
            $scope.activeShop = localStorage.getItem('activeShop');
            $scope.product = response.data;
            $scope.productAdditions = response.data.additions;

        }, error => {
            console.log(error);
        });

        $http({
            method: 'GET',
            url: '/api/addition/list'
        })
            .then(function successCallback(response) {
                $scope.availableAdditions = response.data;
                console.log("/addition/get-all/" , $scope.availableAdditions);
                showSelectedAddition($scope.availableAdditions);
            }, function errorCallback(error) {
                $scope.loading = false;
                console.log(error);
            });

        showSelectedAddition = () => {
            console.log('show selected addition => ', $scope.availableAdditions, $scope.productAdditions);
            $scope.productAdditions.forEach( _productAddition => {
                checkAddition(_productAddition);
            })
        }

        checkAddition = (_productAddition) => {
           console.log('_availableAddition => ', _productAddition);
        }

        $scope.selectedDefaultAddition = (event) => {
             console.log("selectedDefaultAddition (checkbox) =>" , event);
        }

        $scope.selectedAddition = (event) => {
            console.log("selectedAddition =>" , event.$index);
            const addition = event.addition;
            addition.isSelected ? addition.isSelected = false : addition.isSelected = true;
            const url = addition.isSelected ? `/api/addition/add/${$routeParams.productUuid}/${addition.uuid}/${addition.isDefault}` : `/api/addition/remove/${$routeParams.productUuid}/${addition.uuid}`;

            $http({
                method: 'PUT',
                url: url
            }).then(response => {
                console.log('product addition/add/remove', response);
                addition.isSelected = response.data.isSelected;
                //addition.isSelected ? $scope.productAdditions.push(response.data) : $scope.productAdditions.length === 1 ? $scope.productAdditions = [] : $scope.productAdditions.splice(event.$index, 1);
            }, error => {
                console.log(error);
            });
        }

        sideNavInit.sideNav();
    }]);


