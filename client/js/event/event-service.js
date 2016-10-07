'use strict';

angular.module('event-app')
    .factory('Event', ['$resource', function($resource) {
        return $resource('event-app/events/:id', {}, {
            'update': {
                method: 'PUT'
            }
        });
    }]);
