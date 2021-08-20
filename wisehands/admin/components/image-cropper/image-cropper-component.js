angular.module('WiseHands')
  .component('imageCropperComponent', {
    templateUrl: '/wisehands/admin/partials/ImageCropper.html',
    controller: 'ImageCropperController',
    bindings: {
      'currentImage': '<'
    }
  });