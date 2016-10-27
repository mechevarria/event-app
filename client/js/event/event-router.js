(function() {
    'use strict';

    angular.module('event-app')
        .config(Router);

    Router.$inject = ['$routeProvider'];

    function Router($routeProvider) {
        $routeProvider
            .when('/events', {
                templateUrl: 'views/event/events.html',
                controller: 'EventCtrl'
            });
    }
})();
