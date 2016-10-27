(function() {
    'use strict';
    
    angular.module('event-app')
        .factory('EventSrvc', Service);

    Service.$inject = ['$resource'];

    function Service($resource) {
        return $resource('event-app/events/:id', {}, {
            'update': {
                method: 'PUT'
            }
        });
    }
})();
