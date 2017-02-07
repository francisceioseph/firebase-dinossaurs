(function(){
  "use strict";

  angular.module('services.edit_dino', ['services.dinossaurs'])
    .service('editDinoModal', EditDinoModal);

  EditDinoModal.$inject = ['$ionicModal', '$rootScope', 'dinossaursService'];
  function EditDinoModal($ionicModal, $rootScope, dinossaursService){

    this.showModal = function(dinossaur) {
      let $scope = $rootScope.$new();
      
      $scope.dinossaur = dinossaur;

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
        console.log($scope.dinossaur);
        dinossaursService.updateDinossaur($scope.dinossaur);
        $scope.modal.remove();
      };

      return modalPromise;
    };
  }
})();