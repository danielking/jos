angular.module('common').service 'common.message', ['$rootScope', '$rootElement', ($rootScope, $rootElement) ->
  if $rootElement[0] == document
    $(document).data 'channels', {}
    $(document).on 'msg', (evt, data) ->
      channels = $(document).data 'channels'
      if channels[data.channel]
        for scope in  channels[data.channel]
          scope.$broadcast 'msg',
            from: evt.target.id
            channel: data.channel
            message: data.message

  publish: (channel, message) ->
    $rootElement.trigger 'msg', channel: channel, message: message

  subscribe: (channel) ->
    channels = $(document).data 'channels'
    channels[channel] = channels[channel] || []
    channels[channel].push $rootScope
]

