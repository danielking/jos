angular.module 'common', []

angular.module 'core', ['common']

angular.module('core').run ['apps', '$rootScope', 'common.message', (apps, $rootScope, message) ->
  $rootScope.$$page_title = 'jOS'
  apps.load()
  message.subscribe 'app'
]

$ ->
  angular.bootstrap document, ['core']
