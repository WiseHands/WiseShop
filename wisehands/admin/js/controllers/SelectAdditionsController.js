angular.module('WiseHands')
	.controller('SelectAdditionsController', ['$scope', '$http', 'sideNavInit', '$routeParams',
		function ($scope, $http, sideNavInit, $routeParams) {
			const productUuid = $routeParams.productUuid;
			
			$http({
				url: `/api/product/${productUuid}`
			}).then(({data}) => {
					$scope.activeShop = localStorage.getItem('activeShop');
					$scope.product = data;
					_getAvailableAdditions(data.selectedAddition);
				}, error => console.log(error)
			);
			
			const _getAvailableAdditions = additions => {
				$http({
					url: '/api/addition/list'
				}).then(({data: availableAdditions}) => _setAvailableAdditions(availableAdditions, additions),
					error => console.log(error)
				);
			};
			
			const _setAvailableAdditions = (availableAdditions, additions) => {
				const parsedAdditions = [];
				availableAdditions.forEach(availableAddition => {
					const match = additions.find(item => item.addition.uuid === availableAddition.uuid);
					if (match) match.uuid = availableAddition.uuid;
					parsedAdditions.push({...availableAddition, ...match});
				});
				$scope.availableAdditions = parsedAdditions;
			};
			
			$scope.selectDefaultAddition = (event, {addition}) => {
				event.stopPropagation();
				addition.isSelected = addition.isDefault;
			};
			
			$scope.selectAddition = ({addition}) => {
				addition.isSelected = !addition.isSelected;
			};
			
			$scope.saveAdditions = () => {
				const parsedAdditions = $scope.availableAdditions.map(item => Object.assign(item, {productUuid: productUuid}));
				$http({
					method: 'PUT',
					url: '/api/addition/save/all',
					data: parsedAdditions
				}).then({},
					error => console.log(error)
				);
			};
			
			sideNavInit.sideNav();
		}]);


