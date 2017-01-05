(function() {
    'use strict';

    angular.module('item-app')
        .controller('LeafletCtrl', Controller);

    Controller.$inject = ['$scope'];

    function Controller($scope) {

        $scope.markers = {
            mainMarker: {
                lat: 37,
                lng: -80,
                focus: true,
                title: 'Marker',
                message: 'Item message',
                draggable: false
            }
        }

        $scope.center = {
            lat: 37,
            lng: -80,
            zoom: 6
        }

        ////////////

        function activate() {}

        activate();
    }
})();
