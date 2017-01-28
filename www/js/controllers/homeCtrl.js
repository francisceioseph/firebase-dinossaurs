(function(){
  "use strict";
  
  angular.module('controllers.home', ['ui.router', 'services.dinossaurs'])
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

  HomeController.$inject = ['$scope', 'dinossaursService'];
  function HomeController($scope, dinossaursService) {
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
  };
})();