angular.module('WiseHands')
  .controller('SelectAdditionsController', ['$scope', '$http', 'sideNavInit', '$routeParams',
    function ($scope, $http, sideNavInit, $routeParams) {

      const selectedAdditions = [];

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

      const _setAvailableAdditions = (availableAdditions, selectedAddition) => {
        const parsedAdditions = [];
        availableAdditions.forEach(availableAddition => {
          const match = selectedAddition.find(item => item.addition.uuid === availableAddition.uuid);
          parsedAdditions.push({...availableAddition, ...match});
        });
        $scope.availableAdditions = parsedAdditions;
      };

      $scope.selectDefaultAddition = (event, {addition}) => {
        event.stopPropagation();
        addition.isSelected = addition.isDefault;
        addition.productUuid = $routeParams.productUuid;
        if (selectedAdditions.length === 0) {
            selectedAdditions.push(addition);
        }
        console.log("selectedDefaultAddition", addition);
      };

      $scope.selectAddition = ({addition}) => {
        addition.isSelected = !addition.isSelected;
        addition.productUuid = $routeParams.productUuid;
        selectedAdditions.push(addition);
        console.log("selectAddition", addition);

      };

      const sendSelectedAddition = (url, selectedAdditions) => {
        $http({
          method: 'PUT',
          url: url,
          data: selectedAdditions
        }).then(({data}) => console.log(data),
            error => console.log(error)
        );
      };

      $scope.saveSelectedAdditions = () => {
        console.log('saveSelectedAdditions => ', JSON.stringify(selectedAdditions));
        const url = `/api/addition/save/all`;
        sendSelectedAddition(url, JSON.stringify(selectedAdditions));
      };

      sideNavInit.sideNav();
    }]);


