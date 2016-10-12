'use strict';

function EventSaveCtrl($scope, $uibModalInstance, event) {
  $scope.event = event;

  $scope.ok = function() {
      $uibModalInstance.close($scope.event);
  };

  $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
  };
}

EventSaveCtrl.$inject = ['$scope', '$uibModalInstance', 'event'];

angular.module('event-app')
    .controller('EventSaveCtrl', EventSaveCtrl);
