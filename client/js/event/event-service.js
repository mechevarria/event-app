'use strict';

angular.module('event-app')
  .factory('Event', ['$resource', function ($resource) {
    return $resource('event-app/events/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);
