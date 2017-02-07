(function() {
    'use strict';

    angular.module('item-app')
        .controller('ItemCtrl', Controller);

    Controller.$inject = ['$scope', '$uibModal', 'ItemSrvc', 'toaster'];

    function Controller($scope, $uibModal, ItemSrvc, toaster) {

        $scope.create = function() {
            $scope.open();
        };

        $scope.update = function(id) {
            $scope.item = ItemSrvc.get({
                id: id
            });
            $scope.open($scope.item);
        };

        $scope.delete = function(id) {
            ItemSrvc.delete({
                    id: id
                },
                function() {
                    toaster.pop('success','','Item deleted successfully');
                    activate();
                });
        };

        $scope.save = function(item) {
            if (item.id) {
                ItemSrvc.update({
                        id: item.id
                    }, $scope.item,
                    function() {
                        toaster.pop('success','','Item updated successfully');
                        activate();
                    });
            } else {
                ItemSrvc.save(item,
                    function() {
                        toaster.pop('success','','Item created successfully');
                        activate();
                    });
            }
        };

        $scope.clear = function() {
            $scope.items = [];
            $scope.displayedItems = [];
            $scope.item = {
                'title': '',
                'description': '',
                'id': ''
            };
        };

        $scope.confirm = function(item) {
            var itemDelete = $uibModal.open({
                templateUrl: 'app/components/item/item-delete.html',
                controller: 'ItemDeleteCtrl',
                resolve: {
                    item: function() {
                        return item;
                    }
                }
            });

            itemDelete.result.then(function(entity) {
                $scope.delete(entity.id);
            });
        };

        $scope.open = function(item) {
            var itemSave = $uibModal.open({
                templateUrl: 'app/components/item/item-save.html',
                controller: 'ItemSaveCtrl',
                resolve: {
                    item: function() {
                        return item;
                    }
                }
            });

            itemSave.result.then(function(entity) {
                $scope.save(entity);
            });
        };

        ////////////

        function activate() {
            $scope.clear();
            $scope.items = ItemSrvc.query();
            $scope.displayedItems = $scope.items;
        }

        activate();
    }
})();
