angular.module('core').controller 'CoreController', ['$scope', '$rootElement', 'apps', 'common.message', ($scope, $rootElement, apps, message) ->
  $rootElement.attr 'id', 'core'
  $scope.$on 'app_loaded_all', ->
    $scope.show = true
    $scope.$digest()
  $scope.activeApp = (app) ->
    apps.active app

  $scope.$on 'msg', (evt, data) ->
    console.log evt, data
]
