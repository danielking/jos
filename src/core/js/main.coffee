angular.module 'common', []

angular.module 'core', ['common']

angular.module('core').run ['apps', '$rootScope', (apps, $rootScope) ->
  $rootScope.$$page_title = 'jOS'
  apps.load()
]

$ ->
  angular.bootstrap document, ['core']
