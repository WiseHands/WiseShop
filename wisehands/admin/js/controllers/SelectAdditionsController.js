angular.module('WiseHands')
  .controller('SelectAdditionsController', ['$scope', '$http', 'sideNavInit', '$routeParams',
    function ($scope, $http, sideNavInit, $routeParams) {

      $http({
        url: `/api/product/${$routeParams.productUuid}`
      }).then(({data}) => {
          $scope.activeShop = localStorage.getItem('activeShop');
          $scope.product = data;
          _getAvailableAdditions(data.selectedAddition);
        }, error => console.log(error)
      );

      const _getAvailableAdditions = selectedAddition => {
        $http({
          url: '/api/addition/list'
        }).then(({data}) => _setAvailableAdditions(data, selectedAddition),
          error => console.log(error)
        );
      };

      const  _setAvailableAdditions = (availableAdditions, selectedAddition) => {
        const parsedAdditions = [];
        availableAdditions.forEach(availableAddition => {
          const match = selectedAddition.find(item => item.addition.uuid === availableAddition.uuid);
          parsedAdditions.push({...availableAddition, ...match});
        });
        $scope.availableAdditions = parsedAdditions;
      };

      $scope.selectedDefaultAddition = (event, {addition}) => {
        event.stopPropagation();
        addition.isSelected = addition.isDefault;
        const url = `/api/addition/set/default/${$routeParams.productUuid}/${addition.uuid}/${addition.isDefault}`;
        sentSelectedAddition(url, addition);
      };

      $scope.selectedAddition = ({addition}) => {
        addition.isSelected = !addition.isSelected;
        if (addition.isDefault) addition.isDefault = !addition.isDefault;
        const url = addition.isSelected ? `/api/addition/add/${$routeParams.productUuid}/${addition.uuid}` : `/api/addition/remove/${addition.uuid}`;
        sentSelectedAddition(url, addition);
      };

       const sentSelectedAddition = (url, addition) => {
        $http({
          method: 'PUT',
          url: url
        }).then(({data}) => addition.isSelected = data.isSelected,
            error => console.log(error)
        );
      };

      sideNavInit.sideNav();
    }]);


