angular.module('common').service 'common.message', ['$rootScope', ($rootScope) ->
  publish: (message, data) ->
    PubSub.publish message, data

  subscribe: (message) ->
    PubSub.subscribe message, (message, data) ->
      $rootScope.$emit 'message', message, data
]

