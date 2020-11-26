angular.module('WiseHands')
	.controller('SelectAdditionsController', ['$scope', '$http', 'sideNavInit', '$routeParams',
		function ($scope, $http, sideNavInit, $routeParams) {
			const productUuid = $routeParams.productUuid;

			$http({
				url: `/api/product/${productUuid}`
			}).then(({data}) => {
					$scope.activeShop = localStorage.getItem('activeShop');
					$scope.product = data;
					_getAvailableAdditions(data.selectedAdditions);
				}, error => console.log(error)
			);

			const _getAvailableAdditions = dataSelectedAdditions => {
				$http({
					url: '/api/addition/list'
				}).then(({data: availableAdditions}) => _setAvailableAdditions(availableAdditions, dataSelectedAdditions),
					error => console.log(error)
				);
			};

			const _setAvailableAdditions = (availableAdditions, dataSelectedAdditions) => {
				const parsedAdditions = [];
				availableAdditions.forEach(availableAddition => {
					const match = dataSelectedAdditions.find(item => item.addition.uuid === availableAddition.uuid);
					parsedAdditions.push({...match, ...availableAddition});
				});
				$scope.availableAdditions = parsedAdditions;
			};

			$scope.selectDefaultAddition = (event, {addition}) => {
				event.stopPropagation();
				addition.isSelected = addition.isDefault;
				addition.productUuid = productUuid;

			};

			$scope.selectAddition = ({addition}) => {
			    if (addition.isDefault) {
			        addition.isSelected = addition.isSelected;
			    } else {
			        addition.isSelected = !addition.isSelected;
			    }
				addition.productUuid = productUuid;
			};

			$scope.saveAdditions = () => {
			    let selectAdditions = $scope.availableAdditions.filter( (item) => item.productUuid);
			    if (selectAdditions.length > 0) {
				    $http({
					    method: 'PUT',
					    url: '/api/addition/save/all',
					    data: selectAdditions
				    }).then(response => {
					    $scope.product = response.data;
					    showInfoMsg('SAVED')},
					    error => {showWarningMsg('EROOR')}
				    );
			    } else {
			        showInfoMsg('SAVED');
			    }

			};
			
			sideNavInit.sideNav();
		}]);

showWarningMsg = (msg) => {
	toastr.clear();
	toastr.options = {
		"positionClass": "toast-bottom-right",
		"preventDuplicates": true
	};
	toastr.warning(msg);
}
showInfoMsg = (msg) => {
	toastr.clear();
	toastr.options = {
		"positionClass": "toast-bottom-right",
		"preventDuplicates": true
	};
	toastr.info(msg);
}

