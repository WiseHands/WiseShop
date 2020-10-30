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

      const _getAvailableAdditions = additions => {
        $http({
          url: '/api/addition/list'
        }).then(({data}) => _setAvailableAdditions(data, additions),
          error => console.log(error)
        );
      };

      const  _setAvailableAdditions = (availableAdditions, additions) => {
        const parsedAdditions = [];
        availableAdditions.forEach(availableAddition => {
          const match = additions.find(item => item.addition.uuid === availableAddition.uuid);
          parsedAdditions.push({...availableAddition, ...match});
        });
        $scope.availableAdditions = parsedAdditions;
      };

      $scope.selectDefaultAddition = (event, {addition}) => {
        event.stopPropagation();
        addition.isSelected = addition.isDefault;
        const url = `/api/addition/set/default/${$routeParams.productUuid}/${addition.uuid}/${addition.isDefault}`;
        sendSelectedAddition(url, addition);
      };

      $scope.selectAddition = ({addition}) => {
        addition.isSelected = !addition.isSelected;
        if (addition.isDefault) addition.isDefault = !addition.isDefault;
        const url = addition.isSelected ? `/api/addition/add/${$routeParams.productUuid}/${addition.uuid}` : `/api/addition/remove/${addition.uuid}`;
        sendSelectedAddition(url, addition);
      };

       const sendSelectedAddition = (url, addition) => {
        $http({
          method: 'PUT',
          url: url
        }).then(({data}) => addition.isSelected = data.isSelected,
            error => console.log(error)
        );
      };

      sideNavInit.sideNav();
    }]);


