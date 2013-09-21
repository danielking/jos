angular.module('core').controller 'CoreController', ['$scope', 'apps', '$rootScope', ($scope, apps, $rootScope) ->
  $scope.$on 'app_loaded_all', ->
    $scope.show = true
    $scope.$digest()
  $scope.activeApp = (app) ->
    apps.active app
]
