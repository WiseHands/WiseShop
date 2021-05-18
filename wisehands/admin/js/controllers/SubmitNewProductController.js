angular.module('WiseHands')
  .controller('SubmitNewProductController', [
    '$scope', '$location', '$http',
    function ($scope, $location, $http) {
      $scope.product = {isActive: true};
      $scope.productImages = [];

      $scope.$on('crop-image', (event, data) => handleCroppedImage(event, data));

      const handleCroppedImage = (event, data) => {
        $scope.productImages.push(data);
        $scope.imageToCrop = '';
        $('.error-text').css('display', 'none');
      };

      $http({
        method: 'GET',
        url: '/api/category'
      })
        .then(response => {
          $scope.NumberOfCategoriesToShow = 6;
          $scope.categories = response.data;
          $scope.loading = false;
        }, error => {
          $scope.loading = false;
          console.log(error);
        });

      $scope.showMore = function () {
        $scope.NumberOfCategoriesToShow = $scope.categories.length;
        document.querySelector(".show-more-btn").style.display = 'none';
        document.querySelector(".show-less-btn").style.display = 'block';

      };

      $scope.showLess = function () {
        $scope.NumberOfCategoriesToShow = 6;
        document.querySelector(".show-less-btn").style.display = 'none';
        document.querySelector(".show-more-btn").style.display = 'block';
      };

      $scope.loadImage = () => {
        $('#imageLoader').trigger('click');
      };

      const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });

      const dataURItoBlob = dataURI => {
        const binary = atob(dataURI.split(',')[1]);
        const binaryArray = [];
        [...binary].forEach((item, index) => binaryArray.push(binary.charCodeAt(index)));

        return new Blob([new Uint8Array(binaryArray)], {type: 'image/jpeg'});
      };

      $('#imageLoader').change(event => handleImage(event.originalEvent));

      const handleImage = async event => {
        const file = event.target.files[0];
        if (!file) return;
        const convertedFile = await toBase64(file);
        $scope.product.mainPhoto = 0;
        $scope.imageToCrop = convertedFile;
        $scope.$apply();
      };

      $scope.setMainPhotoIndex = function (index) {
        if ($scope.product) {
          $scope.product.mainPhoto = index;
        }
      };

      $scope.removeImage = function (index) {
        $scope.productImages.splice(index, 1);
        if (index === $scope.product.mainPhoto) $scope.product.mainPhoto = 0;
      };

      $scope.createCategory = function () {
        $scope.loading = true;
        $http({
          method: 'POST',
          url: '/api/category',
          data: $scope.category
        })
          .then(function successCallback(response) {

            $scope.loading = false;
            $scope.hideModal();

          }, function errorCallback(response) {
            $scope.loading = false;
            console.log(response);
          });
      };

      $scope.createCategory = function () {
        $scope.loading = true;
        $http({
          method: 'POST',
          url: '/api/category',
          data: $scope.newCategory
        })
          .then(function successCallback(response) {
            $scope.createdCategory = response.data;
            $scope.categories.push($scope.createdCategory);
            if (!$scope.product) {
              $scope.product = {};
            }
            $scope.product.category = $scope.createdCategory;
            $scope.loading = false;
            $scope.hideModal();

          }, function errorCallback(response) {
            $scope.loading = false;
            console.log(response);
          });
      };

      $scope.chooseCategory = function (categoryid) {
        console.log('categoryid', categoryid);
        $scope.selectedCategoryId = categoryid;
        if ($scope.selectedCategoryId) {
          document.getElementById('error-select-category').style.display = "none";
        }
        event.stopPropagation();
      };
      $scope.isCategorySelected = function (categoryid) {
        return categoryid === $scope.selectedCategoryId;
      };
      $scope.hideModal = function () {
        $('#categoryModal').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
      };

      function getProductName() {
        let activeShopLocale = localStorage.getItem('activeShopLocale');
        if (activeShopLocale === 'uk_UA') {
          return $scope.product.nameUk;
        } else {
          return $scope.product.nameEn;
        }
      }

      function getProductDescription() {
        let activeShopLocale = localStorage.getItem('activeShopLocale');
        if (activeShopLocale === 'uk_UA') {
          return $scope.product.descriptionUk;
        } else {
          return $scope.product.descriptionEn;
        }
      }

      $scope.submitProduct = () => {
        const isImageUploaded = $scope.productImages.length;
        $('.error-text').css('display', isImageUploaded ? 'none' : 'block');
        if (!isImageUploaded) return;

        if (!$scope.selectedCategoryId) {
          document.getElementById('error-select-category').style.display = "block";
          return;
        }

        $scope.loading = true;
        const fd = new FormData();
        $scope.productImages.forEach((image, index) => fd.append(`photos[${index}]`, dataURItoBlob(image)));
        fd.append('name', getProductName());
        fd.append('description', getProductDescription());
        fd.append('price', $scope.product.price);
        fd.append('mainPhotoIndex', $scope.product.mainPhoto);
        fd.append('category', $scope.selectedCategoryId);
        fd.append('isActive', $scope.product.isActive);
        fd.append('oldPrice', $scope.product.oldPrice);
        fd.append('sortOrder', $scope.product.sortOrder);
        fd.append('nameUk', $scope.product.nameUk);
        fd.append('descriptionUk', $scope.product.descriptionUk);
        fd.append('nameEn', $scope.product.nameEn);
        fd.append('descriptionEn', $scope.product.descriptionEn);

        $http.post('/api/product', fd, {
          transformRequest: angular.identity,
          headers: {
            'Content-Type': undefined,
          }
        })
          .success(function (data) {
            $scope.loading = false;
            $location.path('/product/details/' + data.uuid);
            console.log(data);
            showInfoMsg("SAVED");
          })
          .error(function (response) {
            $scope.loading = false;
            console.log(response);
            showWarningMsg("ERROR");
          });
      };
    }]);

function showWarningMsg(msg) {
  toastr.clear();
  toastr.options = {
    "positionClass": "toast-bottom-right",
    "preventDuplicates": true
  };
  toastr.warning(msg);
}

function showInfoMsg(msg) {
  toastr.clear();
  toastr.options = {
    "positionClass": "toast-bottom-right",
    "preventDuplicates": true
  };
  toastr.info(msg);
}