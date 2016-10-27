(function() {
    'use strict';

    angular.module('event-app')
        .config(Router);

    Router.$inject = ['$routeProvider'];

    function Router($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/home.html',
                controller: 'HomeCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
})();
