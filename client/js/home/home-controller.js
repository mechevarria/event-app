'use strict';

function HomeCtrl($scope) {
    $scope.welcome = '';
}

HomeCtrl.$inject = ['$scope'];

angular.module('event-app')
    .controller('HomeCtrl', HomeCtrl);
