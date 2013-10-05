angular.module 'common', []

angular.module 'core', ['common']

angular.module('core').run ['apps', '$rootScope', 'common.message', (apps, $rootScope, message) ->
  $rootScope.$$page_title = 'jOS'
  apps.load()
  message.subscribe 'app'
]

window.initUi = (el) ->
  el = $(el)
  el.find('.ui.dropdown').dropdown
    debug: false

$ ->
  angular.bootstrap document, ['core']
  initUi document
