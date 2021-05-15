angular.module('WiseHands')
  .controller('SubmitNewProductController', [
    '$scope', '$location', '$http', '$uibModal',
    function ($scope, $location, $http, $uibModal) {
      $scope.product = {isActive: true};
      $scope.productImages = [];
      $scope.productImagesDTO = [];

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

      }
      $scope.showLess = function () {
        $scope.NumberOfCategoriesToShow = 6;
        document.querySelector(".show-less-btn").style.display = 'none';
        document.querySelector(".show-more-btn").style.display = 'block';
      }

      $scope.loadImage = function () {
        $('#imageLoader').click();
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
      }

      $('#imageLoader').change(event => handleImage(event.originalEvent));

      const handleImage = async event => {
        const file = event.target.files[0];
        const convertedFile = await toBase64(file);


// TODO: handle this validation using data model + productImagesDto should be created on submit form
        // if (file) {
        //   document.querySelector(".error-text").style.display = "none";
        //   document.querySelector(".load-product-image").classList.remove("load-product-image-border");
        // }



        $scope.$apply(() => {
          $scope.product.mainPhoto = 0;
          $scope.productImages.push(convertedFile);
          $scope.productImagesDTO.push(dataURItoBlob(convertedFile));
          $scope.loading = false;
        })
      }

      $scope.setMainPhotoIndex = function (index) {
        if ($scope.product) {
          $scope.product.mainPhoto = index;
        }
      };

      $scope.removeImage = function (index) {
        $scope.productImages.splice(index, 1);
        $scope.productImagesDTO.splice(index, 1);
        if (index === $scope.product.mainPhoto) {
          $scope.product.mainPhoto = 0;
        }
      };

      // Edit image
      $scope.editImage = function (image, index) {
        console.log('Dto', $scope.productImagesDTO);
        console.log($scope.productImages);
        if (image) {
          var modal = $uibModal.open({
            size: 'md',
            templateUrl: '/wisehands/admin/partials/ImageCropper.html',
            controller: 'ImageCropperController',
            controllerAs: 'vm',
            resolve: {
              currentImage: function () {
                return {
                  dataURL: image
                };
              }
            }
          });
          modal.result.then(
            function (result) {
              var idx = $scope.productImages.indexOf(image);
              $scope.productImages[idx] = result;

              var blob = dataURItoBlob(result);
              $scope.productImagesDTO[index] = blob;
            },
            function (err) {
              console.log(err);
            }
          )
        }
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
        if (!$scope.productImagesDTO.length) {
          $('.error-text').css('display', 'block');
          return;
        }

        if (!$scope.selectedCategoryId) {
          document.getElementById('error-select-category').style.display = "block";
          return;
        }

        $scope.loading = true;
        const fd = new FormData();
        for (var i = 0; i < $scope.productImagesDTO.length; i++) {
          var blob = $scope.productImagesDTO[i];
          fd.append("photos[" + i + "]", blob);
        }
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