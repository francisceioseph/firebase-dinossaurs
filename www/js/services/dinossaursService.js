(function () {
  "use strict";

  /**
   * Módulo services.firebase: modulo criado por mim para configuração e métodos de ajuda do firebase.
   * Módulo firebase: módulo nativo do angularFire.
   */
  angular.module('services.dinossaurs', ['services.firebase', 'firebase'])
    .factory('dinossaursService', DinossaursService);

  DinossaursService.$inject = ['firebaseService', '$firebaseArray'];

  function DinossaursService(firebaseService, $firebaseArray) {
    const service = {
      findAllDinossaurs:  _findAllDinossaurs,
      findDinossaurByKey:  _findDinossaurByKey,
      findDinossaursByHeight:  _findDinossaursByHeight,
      findDinossaursWithHeightBetween:  _findDinossaursWithHeightBetween,
      createDinossaurWithName:  _createDinossaurWithName,
      updateDinossaurWithName:  _updateDinossaurWithName,
      deleteDinossaurWithName:  _deleteDinossaurWithName,
      findAllDinossaursWithAngularFire: _findAllDinossaursWithAngularFire
    };

    return service;

    //Functions area.

    /**
     * Carrega todos os dinossauros presentes no nó dinossauros utilizando $firebaseArray
     * da biblioteca Angular Fire.
     */
    function _findAllDinossaursWithAngularFire(){
      let dinossaurPath = 'dinossauros';
      let dinossaurRef  = firebaseService.getReferenceWithPath(dinossaurPath);

      return $firebaseArray(dinossaurRef);
    }

    /**
     * Carrega todos os registros do nó dinossauros utilizando a Firebase SDK
     * @returns Firebase Promise
     */
    function _findAllDinossaurs() {
      let dinossaursPath = 'dinossauros';
      let dinossarusRef  = firebaseService.getReferenceWithPath(dinossaursPath);

      return dinossarusRef.once('value');
    }

    function _findDinossaurByKey(key) {
      let dinossaurPath = `dinossauros/${key}`;
      let dinossaurRef  = firebaseService.getReferenceWithPath(dinossaurPath);

      return dinossaurRef.once('value');
    }

    function _findDinossaursByHeight(height) {
      let dinossaursPath = 'dinossauros';
      let dinossarusRef  = firebaseService.getReferenceWithPath(dinossaursPath);

      return dinossarusRef.orderByChild('altura').equalTo(height).once('value');
    }

    function _findDinossaursWithHeightBetween (minHeight, maxHeight) {
      let dinossaursPath = 'dinossauros';
      let dinossarusRef  = firebaseService.getReferenceWithPath(dinossaursPath);

      return dinossarusRef.orderByChild('altura').startAt(minHeight).endAt(maxHeight).once('value');
    }

    function _createDinossaurWithName (dinossaurName, dinossaur) {
      let dinossaurPath = `dinossauros/${dinossaurName}`;
      let dinossaurRef  = firebaseService.getReferenceWithPath(dinossaurPath);

      return dinossaurRef.set(dinossaur);
    }

    function _updateDinossaurWithName (dinossaurName, dinossaur) {
      let dinossaurPath = `dinossauros/${dinossaurName}`;
      let dinossaurRef  = firebaseService.getReferenceWithPath(dinossaurPath);

      return dinossaurRef.update(dinossaur);
    }

    function _deleteDinossaurWithName (dinossaurName) {
      let dinossaurPath = `dinossauros/${dinossaurName}`;
      let dinossaurRef  = firebaseService.getReferenceWithPath(dinossaurPath);

      return dinossaurRef.remove();
    }
  }
})();