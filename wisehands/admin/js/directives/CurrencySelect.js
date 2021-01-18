angular.module('WiseHands')
  .controller(['$scope', function($scope) {
    $scope.customer = {
      name: 'Naomi',
      address: '1600 Amphitheatre'
    };
  }])
  .directive('myCustomer', function() {
    return {
      template: ''+
      '<div class="language-select" ng-if="visible">'+
      '<p>'+
      '{{"directives.currency-select.Currency" | translate}}:'+
      '<select class="form-control" ng-model="currentLocaleDisplayName"'+
      'ng-options="localesDisplayName for localesDisplayName in localesDisplayNames"'+
      'ng-change="changeLanguage(currentLocaleDisplayName); changeLocale(currentLocaleDisplayName)">'+
      '</select>'+
      '</p>'+
      '</div>'+
      ''
    };
  });