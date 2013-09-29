angular.module(APP_NAME).controller 'AppController', ['$scope', 'common.message', ($scope, message) ->
  $scope.app_name = APP_NAME
  message.publish 'app', 'hello'
]
