'use strict';

function HomeRouter($routeProvider) {
  $routeProvider
      .when('/', {
          templateUrl: 'views/home/home.html',
          controller: 'HomeCtrl'
      })
      .otherwise({
          redirectTo: '/'
      });
}

HomeRouter.$inject = ['$routeProvider'];

angular.module('event-app')
    .config(HomeRouter);
