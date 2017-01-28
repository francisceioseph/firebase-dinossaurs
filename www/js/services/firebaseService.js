(function () {
  "use strict";

  angular.module('services.firebase', [])
    .factory('firebaseService', FirebaseService);

  FirebaseService.$inject = [];

  function FirebaseService() {
    const firebaseConfig = {
      apiKey: "AIzaSyDe3_dpVcv56_fwDZndShyIcGTHaQHqOMU",
      authDomain: "dinossauros-f9582.firebaseapp.com",
      databaseURL: "https://dinossauros-f9582.firebaseio.com",
      storageBucket: "dinossauros-f9582.appspot.com",
      messagingSenderId: "225828116114"
    };

    firebase.initializeApp(firebaseConfig);

    const rootRef  = firebase.database().ref();

    const service = {
      getReferenceWithPath: _getReferenceWithPath
    };

    return service;

    // The service functions

    function _getReferenceWithPath(path) {
      return rootRef.child(path);
    }
  }
})();