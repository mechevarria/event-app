'use strict';

function routeProvider($routeProvider) {
  $routeProvider
      .when('/', {
          templateUrl: 'views/home/home.html',
          controller: 'HomeController'
      })
      .otherwise({
          redirectTo: '/'
      });
}

routeProvider.$inject = ['$routeProvider'];

angular.module('event-app')
    .config(routeProvider);
