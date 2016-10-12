'use strict';

function EventRouter($routeProvider) {
    $routeProvider
        .when('/events', {
            templateUrl: 'views/event/events.html',
            controller: 'EventCtrl',
            resolve: {
                resolvedEvent: ['EventSrvc', function(EventSrvc) {
                    return EventSrvc.query();
                }]
            }
        });
}

EventRouter.$inject = ['$routeProvider'];

angular.module('event-app')
    .config(EventRouter);
