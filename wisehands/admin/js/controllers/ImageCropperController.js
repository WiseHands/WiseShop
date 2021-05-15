angular
  .module('WiseHands')
  .factory('CropperFactory', CropperFactory)
  .controller('ImageCropperController', ImageCropperController);

// Injection: CropperFactory
CropperFactory.$inject = ['$window'];

function CropperFactory($window) {
  return function (callback) {
    if (!$window.Cropper) {
      var script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.4.1/cropper.min.js';
      document.head.appendChild(script);
      script.onload = function () {
        callback($window.Cropper)
      }
    } else {
      callback($window.Cropper);
    }
  }
}

ImageCropperController.$inject = [
  '$scope',
  '$document',
  'CropperFactory',
]

function ImageCropperController(
  $scope,
  $document,
  CropperFactory,
) {
  var vm = $scope;
  var cropper = null;
  // Image statuses
  vm.imageStatus = {
    isVisible: true,
    fetching: true,
    fetched: false,
    error: false
  };
  vm.currentImage = this.currentImage;

  angular.extend($scope, {
    onInit: function () {
      var image = new Image();
      image.onload = function () {
        vm.imageStatus.isVisible = true;
        vm.imageStatus.fetching = false;
        vm.imageStatus.fetched = true;
        $scope.$apply();

        CropperFactory(function (Cropper) {
          var image = $document[0].getElementById('image');
          console.log(vm, this, $scope);
          cropper = new Cropper(image, {
            aspectRatio: 4 / 3,
            viewMode: 0,
            ready: function (evt) {
              console.log('Cropper status', evt.type);
              vm.imageStatus.isVisible = false;
              $scope.$apply();
            }
          });
        });
      };
      image.onerror = function () {
        vm.imageStatus.fetching = false;
        vm.imageStatus.error = true;
      }
      image.src = vm.currentImage;
    },

    submitCrop: function () {
      var croppedImage = cropper.getCroppedCanvas().toDataURL();
      $uibModalInstance.close(croppedImage);
    }
  });

  // Image cropper handler
  angular.extend($scope, {
    zoomIn: function () {
      cropper.zoom(0.1);
    },
    zoomOut: function () {
      cropper.zoom(-0.1);
    },
    rotateRight: function () {
      cropper.rotate(45);
    },
    rotateLeft: function () {
      cropper.rotate(-45);
    }
  });
}