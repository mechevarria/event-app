(function() {
    'use strict';

    angular.module('item-app')
        .controller('HomeCtrl', Controller);

    Controller.$inject = ['$scope'];

    function Controller($scope) {
        $scope.welcome = 'Welcome to Item app!';
    }
})();
