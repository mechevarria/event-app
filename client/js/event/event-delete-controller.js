(function() {
    'use strict';

    angular.module('event-app')
        .controller('EventDeleteCtrl', Controller);

    Controller.$inject = ['$scope', '$uibModalInstance', 'event'];

    function Controller($scope, $uibModalInstance, event) {
        $scope.event = event;

        $scope.ok = function() {
            $uibModalInstance.close($scope.event);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
