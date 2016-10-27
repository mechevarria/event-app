(function() {
    'use strict';

    angular.module('event-app')
        .controller('HomeCtrl', Controller);

    Controller.$inject = ['$scope'];

    function Controller($scope) {
        $scope.welcome = '';
    }
})();
