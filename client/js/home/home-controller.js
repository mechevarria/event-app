'use strict';

function homeController($scope) {
    $scope.welcome = '';
}

homeController.$inject = ['$scope'];

angular.module('event-app')
    .controller('HomeController', homeController);
