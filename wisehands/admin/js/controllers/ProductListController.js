angular.module('WiseHands')
  .controller('ProductListController', ['$scope', '$http', 'spinnerService', 'sideNavInit', 'signout',
    function ($scope, $http, spinnerService, sideNavInit, signout) {
      $scope.loading = true;
      $scope.wrongMessage = false;
      $scope.getResource = function () {
        spinnerService.show('mySpinner');
        $http({
          method: 'GET',
          url: '/api/products'
        })
          .then(function successCallback(response) {
            spinnerService.hide('mySpinner');
            $scope.loading = false;
            $scope.products = response.data;
            $scope.activeShop = localStorage.getItem('activeShop');
            if ($scope.products.length === 0) {
              $scope.isProductsInShop = true;
              $scope.hideMoreButton = true;
            }
            console.log($scope.products);

          }, function errorCallback(data) {
            spinnerService.hide('mySpinner');
            $scope.wrongMessage = true;
            $scope.loading = false;
          });
      };

      $scope.setProductProperties = (event) => {

        console.log('setProductProperties => ', event.product);
      };

      $scope.setDishOfDay = (event, product) => {
        const isClickedProductIsDishOfDay = $scope.products.find(item => item.uuid === product.uuid && item.isDishOfDay);
        if (isClickedProductIsDishOfDay) isClickedProductIsDishOfDay.isDishOfDay = false;
        else {
          $scope.products.forEach(product => product.isDishOfDay = false);
          $scope.products.find(item => item.uuid === product.uuid).isDishOfDay = !product.isDishOfDay;
        }
        _setDishOfDay(product);
      };

      const _setDishOfDay = product => {
        $http({
          method: 'PUT',
          url: '/api/banner/set/dish',
          data: product
        })
          .then(() => {
            },
            () => spinnerService.hide('mySpinner'))
      };

      sideNavInit.sideNav();

      function equalizeHeights(selector) {
        var heights = new Array();

        $(selector).each(function () {

          $(this).css('min-height', '0');
          $(this).css('max-height', 'none');
          $(this).css('height', 'auto');

          heights.push($(this).height());
        });

        var max = Math.max.apply(Math, heights);

        $(selector).each(function () {
          $(this).css('height', max + 'px');
        });
      }

      $scope.search = function (product) {
        if (!$scope.query) {
          return true;
        }
        var searcText = $scope.query.toLowerCase();
        var lowerCaseName = product.name.toLowerCase();
        var total = product.price.toString();
        return lowerCaseName.indexOf(searcText) != -1 || total.indexOf(searcText) !== -1;

      };

      $scope.searchField = false;
      $scope.toggle = function () {
        $scope.searchField = !$scope.searchField;
      };

      $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        equalizeHeights(".fixed-height");

        $(window).resize(function () {

          setTimeout(function () {
            equalizeHeights(".fixed-height");
          }, 120);
        });
      });

    }]);