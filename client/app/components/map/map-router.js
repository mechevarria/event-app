(function() {
    'use strict';

    angular.module('item-app')
        .config(Router);

    Router.$inject = ['$routeProvider'];

    function Router($routeProvider) {
        $routeProvider
            .when('/map', {
                templateUrl: 'app/components/map/map.html',
                controller: 'LeafletCtrl'
            });
    }
})();
