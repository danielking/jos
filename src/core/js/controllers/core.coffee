angular.module('core').controller 'CoreController', ['$scope', '$rootElement', 'apps', 'common.message', 'common.github', ($scope, $rootElement, apps, message, github) ->
  $rootElement.attr 'id', 'core'
  $scope.desktopActive = true

  $scope.$on 'app_loaded_all', ->
    $scope.show = true
    $scope.$digest()
  $scope.activeApp = (app) ->
    $scope.desktopActive = false
    apps.active app

  $scope.toggleDesktop = ->
    $scope.desktopActive = !$scope.desktopActive

  $scope.$on 'msg', (evt, data) ->
    # console.log evt, data


]
