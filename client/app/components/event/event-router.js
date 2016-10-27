(function() {
    'use strict';

    angular.module('event-app')
        .config(Router);

    Router.$inject = ['$routeProvider'];

    function Router($routeProvider) {
        $routeProvider
            .when('/events', {
                templateUrl: 'app/components/event/events.html',
                controller: 'EventCtrl'
            });
    }
})();
