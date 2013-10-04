angular.module(APP_NAME).controller 'AppController', ['$scope', 'common.message', ($scope, message) ->
  $scope.app_name = APP_NAME
  # message.subscribe 'app'

  # $rootScope.$on 'message', ->
  #   console.log arguments

  # message.publish 'app:started', app_name: APP_NAME, event: 'started'
]
