'use strict';

angular.module('event-app')
  .controller('EventController', ['$scope', '$uibModal', 'resolvedEvent', 'Event',
    function ($scope, $uibModal, resolvedEvent, Event) {

      $scope.events = resolvedEvent;

      $scope.create = function () {
        $scope.clear();
        $scope.open();
      };

      $scope.update = function (id) {
        $scope.event = Event.get({id: id});
        $scope.open(id);
      };

      $scope.delete = function (id) {
        Event.delete({id: id},
          function () {
            $scope.events = Event.query();
          });
      };

      $scope.save = function (id) {
        if (id) {
          Event.update({id: id}, $scope.event,
            function () {
              $scope.events = Event.query();
              $scope.clear();
            });
        } else {
          Event.save($scope.event,
            function () {
              $scope.events = Event.query();
              $scope.clear();
            });
        }
      };

      $scope.clear = function () {
        $scope.event = {

          "title": "",

          "description": "",

          "id": ""
        };
      };

      $scope.open = function (id) {
        var eventSave = $uibModal.open({
          templateUrl: 'views/event/event-save.html',
          controller: 'EventSaveController',
          resolve: {
            event: function () {
              return $scope.event;
            }
          }
        });

        eventSave.result.then(function (entity) {
          $scope.event = entity;
          $scope.save(id);
        });
      };
    }])
  .controller('EventSaveController', ['$scope', '$uibModalInstance', 'event',
    function ($scope, $uibModalInstance, event) {
      $scope.event = event;



      $scope.ok = function () {
        $uibModalInstance.close($scope.event);
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    }]);
