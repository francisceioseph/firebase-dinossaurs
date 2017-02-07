(function(){
  "use strict";
  
  angular.module('controllers.home', ['ui.router', 'services.dinossaurs', 'services.new_dino', 'services.edit_dino'])
    .config(HomeRouteConfiguration)
    .controller('homeController', HomeController);

  HomeRouteConfiguration.$inject = ['$stateProvider', '$urlRouterProvider'];
  function HomeRouteConfiguration($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
      url: '/home',
      views: {
        'main-content': {
          templateUrl: 'templates/home.html',
          controller: 'homeController as homeCtrl'
        }
      }
    });

    $urlRouterProvider.otherwise('/home');
  };

  HomeController.$inject = ['$scope', '$ionicListDelegate', '$ionicPopup', 'dinossaursService', 'newDinoModal', 'editDinoModal'];
  function HomeController($scope, $ionicListDelegate, $ionicPopup, dinossaursService, newDinoModal, editDinoModal) {
    let homeCtrl = this;

    homeCtrl.dinossaurs = [];

    homeCtrl.loadAllDinossaursWithFirebaseSDK = function() {
      dinossaursService.findAllDinossaurs()
        .then(dinossaursSnap => {
          dinossaursSnap.forEach(dinossaurSnap => {
            homeCtrl.dinossaurs.push(dinossaurSnap.val());
          });
          $scope.$apply(); 
        })
        .catch(error => {
          console.warn(error);
        });
    };

    homeCtrl.loadAllDinossaursWithAngularFire = function(){
      homeCtrl.dinossaurs = dinossaursService.findAllDinossaursWithAngularFire();
    };

    homeCtrl.openNewDinoModal = function() {
      newDinoModal.showModal()
        .then(modal => {
          modal.show(); 
          $ionicListDelegate.closeOptionButtons();
        });
    };

    homeCtrl.openEditDinoModal = function(dinossaur) {
      editDinoModal.showModal(dinossaur)
        .then(modal => {
          modal.show(); 
          $ionicListDelegate.closeOptionButtons();
        });
    };

    homeCtrl.removeDinossaur = function(dinossaur) {
      $ionicListDelegate.closeOptionButtons()
      
      $ionicPopup.confirm({
        title: 'Alerta!',
        template: 'Tem certeza que desesa exluir esse dinossauro?'
      }).then(response => {
        if (response)
          homeCtrl.dinossaurs.$remove(dinossaur);      
      });
    };
  };
})();