(function(){
  "use strict";

  angular.module('services.new_dino', ['services.dinossaurs'])
    .service('newDinoModal', NewDinoModal);

  NewDinoModal.$inject = ['$ionicModal', '$rootScope', 'dinossaursService'];
  function NewDinoModal($ionicModal, $rootScope, dinossaursService){

    this.showModal = function() {
      let $scope = $rootScope.$new();
      
      $scope.dinossaur = {};

      let modalPromise = $ionicModal.fromTemplateUrl('templates/modals/new_dino.html', {
        scope: $scope,
        animation: 'slide-in-up',
        focusFirstInput: false,
      }).then(modal => {
        $scope.modal = modal;

        return modal;
      });

      $scope.openModal = function(){
        $scope.modal.show();
      };

      $scope.closeModal = function(){
        $scope.modal.remove();
      };

      $scope.saveDinossaur = function() {
        dinossaursService.createDinossaurWithAngularFire($scope.dinossaur)
          .then(addedDinossaurRef => {
            $scope.closeModal();
          })
          .catch(error => {
            console.warn(error);
          });
      };

      return modalPromise;
    };
  }
})();