'use strict';

function EventDeleteCtrl($scope, $uibModalInstance, event) {
  $scope.event = event;

  $scope.ok = function() {
      $uibModalInstance.close($scope.event);
  };

  $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
  };
}

EventDeleteCtrl.$inject = ['$scope', '$uibModalInstance', 'event'];

angular.module('event-app')
    .controller('EventDeleteCtrl', EventDeleteCtrl);
