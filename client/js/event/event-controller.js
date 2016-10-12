'use strict';

function EventCtrl($scope, $uibModal, resolvedEvent, EventSrvc) {
    $scope.events = resolvedEvent;

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
                $scope.events = EventSrvc.query();
            });
    };

    $scope.save = function(id) {
        if (id) {
            EventSrvc.update({
                    id: id
                }, $scope.event,
                function() {
                    $scope.events = EventSrvc.query();
                    $scope.clear();
                });
        } else {
            EventSrvc.save($scope.event,
                function() {
                    $scope.events = EventSrvc.query();
                    $scope.clear();
                });
        }
    };

    $scope.clear = function() {
        $scope.event = {

            'title': '',

            'description': '',

            'id': ''
        };
    };

    $scope.open = function(id) {
        var eventSave = $uibModal.open({
            templateUrl: 'views/event/event-save.html',
            controller: 'EventSaveCtrl',
            resolve: {
                event: function() {
                    return $scope.event;
                }
            }
        });

        eventSave.result.then(function(entity) {
            $scope.event = entity;
            $scope.save(id);
        });
    };
}

EventCtrl.$inject = ['$scope', '$uibModal', 'resolvedEvent', 'EventSrvc'];

angular.module('event-app')
    .controller('EventCtrl', EventCtrl);
