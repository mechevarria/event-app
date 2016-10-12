'use strict';

function EventService($resource) {
    return $resource('event-app/events/:id', {}, {
        'update': {
            method: 'PUT'
        }
    });
}

EventService.$inject = ['$resource'];

angular.module('event-app')
    .factory('EventSrvc', EventService);
