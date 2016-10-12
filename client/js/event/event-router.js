'use strict';

function EventRouter($routeProvider) {
    $routeProvider
        .when('/events', {
            templateUrl: 'views/event/events.html',
            controller: 'EventCtrl'
        });
}

EventRouter.$inject = ['$routeProvider'];

angular.module('event-app')
    .config(EventRouter);
