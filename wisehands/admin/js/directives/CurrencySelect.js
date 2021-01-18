angular.module('WiseHands')
  .directive('ngCurrencySelect', function() {
    return {
      template: ''+
      '<div class="language-select" ng-if="visible">'+
      '<p>'+
      '{{"directives.currency-select.Currency" | translate}}:'+
      '<select class="form-control" ng-model="shopCurrency"'+
      'ng-options="localesDisplayName for localesDisplayName in showAvailableCurrencies"'+
      'ng-change="changeCurrency(shopCurrency)">'+
      '</select>'+
      '</p>'+
      '</div>'+
      '',
	    controller: ['$scope','$http', function ($scope, $http) {
		    $scope.showAvailableCurrencies = ['UAH', 'USD', 'EUR'];
		    $scope.visible = $scope.showAvailableCurrencies &&
			    $scope.showAvailableCurrencies.length > 1;

		    $http({
			    method: 'GET',
			    url: '/shop/details',
		    })
			    .then(response => {
				    console.log("response in currency drop-btn => ", response.data.currencyShop.currency);
				    $scope.shopCurrency = response.data.currencyShop.currency;
			    }, error => {
				    console.log(error);
			    });
		    
		    $scope.changeCurrency = function (currency) {
			    var currentLocale = '';
			    console.log("changeCurrency => ", currency);
			    // $http({
				   //  method: 'PUT',
				   //  url: '/shop/' + currentLocale
			    // })
				   //  .success(function (response) {
				   //  }).
			    // error(function (response) {
				   //  console.log(response);
			    // });
		    };
	    }]
    };
  });