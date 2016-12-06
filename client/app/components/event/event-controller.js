(function() {
    'use strict';

    angular.module('event-app')
        .controller('EventCtrl', Controller);

    Controller.$inject = ['$scope', '$uibModal', 'EventSrvc'];

    function Controller($scope, $uibModal, EventSrvc) {

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
                    activate();
                });
        };

        $scope.save = function(event) {
            if (event.id) {
                EventSrvc.update({
                        id: event.id
                    }, $scope.event,
                    function() {
                        activate();
                    });
            } else {
                EventSrvc.save(event,
                    function() {
                        activate();
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
                templateUrl: 'app/components/event/event-delete.html',
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
                templateUrl: 'app/components/event/event-save.html',
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

        ////////////

        function activate() {
            $scope.clear();
            $scope.events = EventSrvc.query();
            $scope.displayedEvents = $scope.events;
        }

        activate();
    }
})();
