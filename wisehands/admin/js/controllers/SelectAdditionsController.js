angular.module('WiseHands')
  .controller('SelectAdditionsController', ['$scope', '$http', 'sideNavInit', '$routeParams',
    function ($scope, $http, sideNavInit, $routeParams) {

      $http({
        method: 'GET',
        url: `/api/product/${$routeParams.productUuid}`
      }).then(response => {
          $scope.activeShop = localStorage.getItem('activeShop');
          $scope.product = response.data;
        }, error => console.log(error)
      );

      $http({
        method: 'GET',
        url: '/api/addition/list'
      })
        .then(response => $scope.availableAdditions = response.data,
          error => console.log(error)
        );

      $scope.selectedDefaultAddition = (event, {addition}) => {
        event.stopPropagation();
        addition.isSelected = addition.isDefault;
      };

      $scope.selectedAddition = ({addition}) => {
        addition.isSelected = !addition.isSelected;
        if (addition.isDefault) addition.isDefault = !addition.isDefault;
        const url = addition.isSelected ? `/api/addition/add/${$routeParams.productUuid}/${addition.uuid}/${addition.isDefault}` : `/api/addition/remove/${$routeParams.productUuid}/${addition.uuid}`;

        $http({
          method: 'PUT',
          url: url
        }).then(response => addition.isSelected = response.data.isSelected,
          error => console.log(error)
        )
        ;
      };

      sideNavInit.sideNav();
    }]);


