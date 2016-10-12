'use strict';

function EventCtrl($scope, $uibModal, EventSrvc) {

    $scope.create = function() {
        $scope.clear();
        $scope.open();
    };

    $scope.update = function(id) {
        $scope.event = EventSrvc.get({
            id: id
        });
        $scope.open(id);
    };

    $scope.delete = function(id) {
        EventSrvc.delete({
                id: id
            },
            function() {
                init();
            });
    };

    $scope.save = function(event) {
        if (event.id) {
            EventSrvc.update({
                    id: event.id
                }, $scope.event,
                function() {
                    init();
                });
        } else {
            EventSrvc.save(event,
                function() {
                    init();
                });
        }
    };

    $scope.clear = function() {
        $scope.events = [];
        $scope.displayedEvents = [];
        $scope.event = {
            'title': '',
            'description': '',
            'id': ''
        };
    };

    $scope.confirm = function(event) {
      var eventDelete = $uibModal.open({
          templateUrl: 'views/event/event-delete.html',
          controller: 'EventDeleteCtrl',
          resolve: {
              event: function() {
                  return event;
              }
          }
      });

      eventDelete.result.then(function(entity) {
          $scope.delete(entity.id);
      });
    };

    $scope.open = function(event) {
        var eventSave = $uibModal.open({
            templateUrl: 'views/event/event-save.html',
            controller: 'EventSaveCtrl',
            resolve: {
                event: function() {
                    return event;
                }
            }
        });

        eventSave.result.then(function(entity) {
            $scope.save(entity);
        });
    };

    function init() {
      $scope.clear();
      $scope.events = EventSrvc.query();
      $scope.displayedEvents = $scope.events;
    }

    init();
}

EventCtrl.$inject = ['$scope', '$uibModal', 'EventSrvc'];

angular.module('event-app')
    .controller('EventCtrl', EventCtrl);
