'use strict';

angular.module('event-app')
    .controller('EventSaveController', ['$scope', '$uibModalInstance', 'event',
        function($scope, $uibModalInstance, event) {
            $scope.event = event;

            $scope.ok = function() {
                $uibModalInstance.close($scope.event);
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        }
    ]);
