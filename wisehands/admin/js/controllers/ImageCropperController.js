angular
  .module('WiseHands')
  .factory('CropperFactory', CropperFactory)
  .controller('ImageCropperController', ImageCropperController);

CropperFactory.$inject = ['$window'];

function CropperFactory($window) {
  return callback => {
    if (!$window.Cropper) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.4.1/cropper.min.js';
      document.head.appendChild(script);
      script.onload = () => callback($window.Cropper);
    } else callback($window.Cropper);
  }
}

ImageCropperController.$inject = [
  '$scope',
  '$document',
  'CropperFactory',
];

function ImageCropperController(
  $scope,
  $document,
  CropperFactory,
) {
  const vm = $scope;
  let cropper = null;
  vm.currentImage = this.currentImage;
  // Image statuses
  vm.imageStatus = {
    isVisible: true,
    fetching: true,
    fetched: false,
    error: false
  };

  angular.extend($scope, {
    onInit: () => {
      const image = new Image();
      image.onload = () => {
        vm.imageStatus.isVisible = true;
        vm.imageStatus.fetching = false;
        vm.imageStatus.fetched = true;
        $scope.$apply();

        CropperFactory(Cropper => {
          const image = $document[0].getElementById('image');
          cropper = new Cropper(image, {
            aspectRatio: 4 / 3,
            viewMode: 0,
            ready: () => {
              vm.imageStatus.isVisible = false;
              $scope.$apply();
            }
          });
        });
      };
      image.onerror = () => {
        vm.imageStatus.fetching = false;
        vm.imageStatus.error = true;
      }
      image.src = vm.currentImage;
    },

    submitCrop: () => {
      const croppedImage = cropper.getCroppedCanvas().toDataURL();
      $scope.$emit('crop-image', croppedImage);
    }
  });

  // Image cropper handler
  angular.extend($scope, {
    zoomIn: () => cropper.zoom(0.1),
    zoomOut: () => cropper.zoom(-0.1),
    rotateRight: () => cropper.rotate(45),
    rotateLeft: () => cropper.rotate(-45)
  });
}