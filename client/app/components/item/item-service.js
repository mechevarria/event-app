(function() {
    'use strict';

    angular.module('item-app')
        .factory('ItemSrvc', Service);

    Service.$inject = ['$resource'];

    function Service($resource) {
        return $resource('item-app/items/:id', {}, {
            'update': {
                method: 'PUT'
            }
        });
    }
})();
